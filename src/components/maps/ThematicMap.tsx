import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl } from 'react-leaflet';
import L, { type PathOptions, type LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ScaleQuantile } from 'd3-scale';
import { MapLegend } from './MapLegend';
import { formatNumber } from './utils/map-utils';

// Fix Leaflet's default icon path issues in Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ThematicMapProps {
    data: any[];
    geoJsonUrl: string;
    joinField: string; // GeoJSON property to match on
    dataIdField: string; // Data property to match on
    valueField: string; // Data property to visualize (number)
    colorScale: ScaleQuantile<string>;
    height?: string | number;
    title?: string;
    tooltipFormat?: string;
    onFeatureClick?: (feature: any, dataItem: any) => void;
}

const SetBounds = ({ bounds }: { bounds: LatLngBoundsExpression | null }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds);
        }
    }, [bounds, map]);
    return null;
};

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
    onFeatureClick
}) => {
    const [geoJsonData, setGeoJsonData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [_hoveredFeature, setHoveredFeature] = useState<any>(null);

    // Create a lookup map for data performance
    const dataMap = useMemo(() => {
        const map = new Map();
        data.forEach(item => {
            map.set(String(item[dataIdField]), item);
        });
        console.log(`[ThematicMap] Data Map created with ${map.size} entries.`);
        return map;
    }, [data, dataIdField]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(geoJsonUrl)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to fetch GeoJSON from ${geoJsonUrl}`);
                return res.json();
            })
            .then(geoJson => {
                // Match logic for debugging if needed
                // if (data.features && data.features.length > 0) { ... }

                setGeoJsonData(geoJson);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [geoJsonUrl]);

    const bounds = useMemo(() => {
        if (!geoJsonData) return null;
        try {
            const layer = L.geoJSON(geoJsonData);
            return layer.getBounds();
        } catch (e) {
            return null;
        }
    }, [geoJsonData]);

    const style = (feature: any): PathOptions => {
        if (!feature) return {};
        const id = feature.properties[joinField];
        const dataItem = dataMap.get(String(id));
        const value = dataItem ? dataItem[valueField] : null;

        return {
            fillColor: value !== null && value !== undefined ? colorScale(value) : '#eee',
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    };

    const onEachFeature = (feature: any, layer: L.Layer) => {
        const id = feature.properties[joinField];
        const dataItem = dataMap.get(String(id));
        const value = dataItem ? dataItem[valueField] : null;

        layer.bindTooltip(
            `<div>
                <strong>${id}</strong><br/>
                ${value !== null ? formatNumber(value, tooltipFormat) : 'No Data'}
            </div>`,
            { sticky: true, direction: 'top' }
        );

        layer.on({
            mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: '#666',
                    fillOpacity: 0.9
                });
                layer.bringToFront();
                setHoveredFeature({ feature, dataItem });
            },
            mouseout: (e) => {
                const layer = e.target;
                // specialized resetStyle unavailable on generic layer, so we restyle manually
                // or preferably use geojson ref to reset. 
                // For simplicity, we just re-apply the style function logic locally or allow redraw
                // Ideally we'd use 'resetStyle' from the GeoJSON component ref, but simple inline style is okay.
                if (feature) {
                    const originalStyle = style(feature);
                    layer.setStyle(originalStyle);
                }
                setHoveredFeature(null);
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
                        data={geoJsonData}
                        style={style}
                        onEachFeature={onEachFeature}
                    />
                )}

                <SetBounds bounds={bounds} />

                {/* Optional: Add custom controls or overlays here */}
            </MapContainer>

            <MapLegend scale={colorScale} title={title} />
        </div>
    );
};
