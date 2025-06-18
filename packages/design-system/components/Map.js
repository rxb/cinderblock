import React, {Fragment, useContext} from 'react';
import Text from './Text';
import {View} from '../primitives';

/**
 * Placeholder map component (Leaflet implementation commented out).
 * Currently returns an empty View. See commented code for Leaflet integration.
 * 
 * The Map component is designed to integrate with Leaflet.js for interactive
 * mapping functionality. The current implementation is a placeholder that
 * returns an empty View. The commented code below shows a complete Leaflet
 * integration with marker clustering and dynamic updates.
 * 
 * Features of the full implementation:
 * - OpenStreetMap tile integration
 * - Marker clustering with react-leaflet
 * - Dynamic marker updates and bounds fitting
 * - Popup support for marker interactions
 * - Responsive zoom and center controls
 * 
 * Note: Leaflet integration requires additional setup and dependencies.
 * The component is currently disabled to avoid bundle size and compatibility issues.
 * 
 * @example
 * // Current placeholder usage
 * function MapPlaceholder() {
 *   return (
 *     <Chunk>
 *       <Text>Map functionality coming soon</Text>
 *       <Map />
 *     </Chunk>
 *   );
 * }
 * 
 * @example
 * // Intended usage with Leaflet (when enabled)
 * function LocationMap() {
 *   const [locations, setLocations] = useState([
 *     { id: 1, lat: 40.7128, lon: -74.0060, title: "New York" },
 *     { id: 2, lat: 34.0522, lon: -118.2437, title: "Los Angeles" },
 *     { id: 3, lat: 41.8781, lon: -87.6298, title: "Chicago" }
 *   ]);
 * 
 *   return (
 *     <Section>
 *       <Chunk><Text type="title">Store Locations</Text></Chunk>
 *       
 *       <Chunk>
 *         <Map
 *           center={[39.8283, -98.5795]} // Center of USA
 *           zoom={4}
 *           markers={locations}
 *           cluster={true}
 *           fitBounds={true}
 *           style={{ height: 400, width: '100%' }}
 *         />
 *       </Chunk>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Single location map (when enabled)
 * function BusinessLocation() {
 *   const businessLocation = {
 *     lat: 37.7749,
 *     lon: -122.4194,
 *     title: "Our Office - San Francisco"
 *   };
 * 
 *   return (
 *     <Card>
 *       <Section>
 *         <Chunk><Text type="sectionHead">Visit Us</Text></Chunk>
 *         
 *         <Chunk>
 *           <Map
 *             center={[businessLocation.lat, businessLocation.lon]}
 *             zoom={15}
 *             markers={[businessLocation]}
 *             cluster={false}
 *             style={{ height: 300, borderRadius: 8 }}
 *           />
 *         </Chunk>
 *         
 *         <Chunk>
 *           <Text>123 Market Street, San Francisco, CA 94103</Text>
 *         </Chunk>
 *       </Section>
 *     </Card>
 *   );
 * }
 */
const Map = () => <View />;
export default Map;

/*
// LEAFLET MAP
// Leaflet is very much not react-like
// It doesn't even use modules
// But here's a wrapper
class Map extends React.Component {

	mapRef = React.createRef();


	static defaultProps = {
        center: [0,0],
        zoom: 1
    }

	componentDidMount() {

		// DIV needs to wait to be mounted completely
		setTimeout( () => {
			import('leaflet').then( () => {
				// this is some crazy shit
				// but leaflet really wants to be global
				// hopefully this isn't a problem later
				require('leaflet.markercluster');

				this.map = L.map(this.mapRef.current, {
					center: this.props.center,
					zoom: this.props.zoom,
					layers: [
						L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
							attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						}),
					]
				});
				this.layerGroup = L.featureGroup().addTo(this.map);
		      	this.drawMarkers(this.props.markers);
		 	});
		}, 100);

	}

	drawMarkers(items = []){
		this.layerGroup.clearLayers();
		let targetGroup = this.layerGroup;
		if(this.props.cluster){
			const markerClusterGroup = L.markerClusterGroup({maxClusterRadius: 50, removeOutsideVisibleBounds: true});
			markerClusterGroup.addTo(this.layerGroup);
			targetGroup = markerClusterGroup;
		}

		items.forEach((m, i) => {
			const marker = L.marker({lat: m.lat, lon: m.lon});
			if(m.title){
				marker.bindPopup(m.title);
			}
			marker.addTo(targetGroup);
		});

		if(this.props.fitBounds && items.length > 0){
			this.map.fitBounds( items.map( m => ([m.lat, m.lon]) )  );
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.markers !== prevProps.markers && this.layerGroup) {
			this.drawMarkers(this.props.markers);
		}
	}

	render(){
		const {
			children,
			markers,
			cluster,
			style,
			...other
		} = this.props
		return(
			<div ref={this.mapRef} style={style} {...other}>{children}</div>
		);
	}

}

export default Map;

*/