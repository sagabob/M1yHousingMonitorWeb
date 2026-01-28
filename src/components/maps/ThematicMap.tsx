import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl } from 'react-leaflet';
import L, { type PathOptions, type LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MapLegend } from './MapLegend';
import { formatNumber } from './utils/map-utils';

// Fix Leaflet's default icon path issues in Webpack/Vite environments
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Interfaces ---

interface ThematicMapProps {
    data: any[];
    geoJsonUrl: string;
    /** Property in GeoJSON features to match against data (e.g. SA1_CODE) */
    joinField: string;
    /** Property in data items to match against GeoJSON (e.g. Area_Id) */
    dataIdField: string;
    /** Numerical property in data to visualize (e.g. Approvals) */
    valueField: string;
    /** D3 scale function */
    colorScale: any;
    height?: string | number;
    title?: string;
    tooltipFormat?: string;
    onFeatureClick?: (feature: any, dataItem: any) => void;
    totalStats?: string;
}

// --- Sub-components ---

/**
 * Helper component to fit map bounds when they change
 */
const SetBounds = ({ bounds }: { bounds: LatLngBoundsExpression | null }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds);
        }
    }, [bounds, map]);
    return null;
};

/**
 * Custom control to display total stats overlay
 */
const MapStatsControl = ({ content }: { content: string }) => {
    return (
        <div className="leaflet-top leaflet-left" style={{ marginTop: '70px', marginLeft: '0px' }}>
            <div className="leaflet-control leaflet-bar bg-white p-2 shadow-md rounded text-sm font-semibold border border-gray-300 text-gray-800">
                {content}
            </div>
        </div>
    );
};

// --- Main Component ---

/**
 * ThematicMap
 * 
 * Generic Choropleth map component using Leaflet.
 * Fetches GeoJSON from a URL and joins it with provided `data`.
 */
export const ThematicMap: React.FC<ThematicMapProps> = ({
    data,
    geoJsonUrl,
    joinField,
    dataIdField,
    valueField,
    colorScale,
    height = 600,
    title,
    tooltipFormat = '0,0',
    onFeatureClick,
    totalStats
}) => {
    const [geoJsonData, setGeoJsonData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // State for map data loading

    // Create a unique key for the GeoJSON layer to force remounting when data changes
    const [layerKey, setLayerKey] = useState(0);

    useEffect(() => {
        setLayerKey(prev => prev + 1);
    }, [data, joinField, valueField, colorScale]);

    // Create a lookup map for faster data matching
    const dataMap = useMemo(() => {
        const map = new Map();
        data.forEach(item => {
            map.set(String(item[dataIdField]), item);
        });
        return map;
    }, [data, dataIdField]);

    // Fetch GeoJSON data
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(geoJsonUrl)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to fetch GeoJSON from ${geoJsonUrl}`);
                return res.json();
            })
            .then(geoJson => {
                setGeoJsonData(geoJson);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [geoJsonUrl]);

    // Calculate bounds of the GeoJSON layer
    const bounds = useMemo(() => {
        if (!geoJsonData) return null;
        try {
            const layer = L.geoJSON(geoJsonData);
            return layer.getBounds();
        } catch (e) {
            return null;
        }
    }, [geoJsonData]);

    // Styling function for each feature
    const style = (feature: any): PathOptions => {
        if (!feature) return {};
        const id = feature.properties[joinField];
        const dataItem = dataMap.get(String(id));
        const value = dataItem ? dataItem[valueField] : null;

        let fillColor = 'transparent';
        let fillOpacity = 0;

        if (value !== null && value !== undefined) {
            fillColor = value === 0 ? '#ffffff' : colorScale(value);
            fillOpacity = 0.7;
        }

        return {
            fillColor,
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity
        };
    };

    // Interaction handlers
    const onEachFeature = (feature: any, layer: L.Layer) => {
        const id = feature.properties[joinField];
        const dataItem = dataMap.get(String(id));
        const value = dataItem ? dataItem[valueField] : null;

        layer.bindTooltip(
            `<div>
                <strong>SA1: ${id}</strong><br/>
                ${value != null ? (value > 0 ? 'Approvals: ' + formatNumber(value, tooltipFormat) : 'Approval: ' + formatNumber(value, tooltipFormat)) : 'No Data'}
            </div>`,
            { sticky: true, direction: 'top' }
        );

        layer.on({
            mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                    weight: 1,
                    color: '#666',
                    fillOpacity: 0.9
                });
                layer.bringToFront();
            },
            mouseout: (e) => {
                const layer = e.target;
                if (feature) {
                    const originalStyle = style(feature);
                    layer.setStyle(originalStyle);
                }
            },
            click: () => {
                if (onFeatureClick) onFeatureClick(feature, dataItem);
            }
        });
    };

    if (loading) return <div className="flex items-center justify-center p-12 text-gray-500">Loading map data...</div>;
    if (error) return <div className="text-red-500 p-4">Error loading map: {error}</div>;

    return (
        <div className="relative w-full border rounded-md overflow-hidden bg-gray-50" style={{ height }}>
            <MapContainer
                style={{ height: '100%', width: '100%' }}
                zoom={10}
                minZoom={4}
                scrollWheelZoom={true}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="Base Map">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked name="Open Street Map">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {geoJsonData && (
                    <GeoJSON
                        key={layerKey}
                        data={geoJsonData}
                        style={style}
                        onEachFeature={onEachFeature}
                    />
                )}

                <SetBounds bounds={bounds} />

                {totalStats && (
                    <div className="leaflet-control-container">
                        <MapStatsControl content={totalStats} />
                    </div>
                )}
            </MapContainer>

            <MapLegend scale={colorScale} title={title} />
        </div>
    );
};
