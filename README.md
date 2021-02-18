# ts-polygons-intersect

This script finds all points where the polygons intersect each other. 

## Install
```bash
npm install ts-polygons-intersect
```

## Usage
```typescript
import {Polygon, intersection} from 'ts-polygons-intersect';
const poly1 = Polygon.fromJson([{x:0,y:1}, ...]);
const poly1 = Polygon.fromJson([{x:1,y:0}, ...]);
const intersection = intersection(poly1, poly2);
```

## License
MIT
