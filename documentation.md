
# PROJECT NAME

---

Name: Sandro Brognara

Date: 4/5/19

Project Topic: Rollercoaster Database and Reviews

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name                     `Type: String`
- `Field 2`:     Year opened              `Type: Number`
- `Field 3`:     Height (ft)              `Type: Number`
- `Field 4`:     Max Speed (mph)          `Type: Number`
- `Field 5`:     Inversions               `Type: Number`
- `Field 6`:     Duration (seconds)       `Type: Number`
- `Field 7`:     Length (feet)            `Type: Number`
- `Field 8`:     Capacity (riders/hr)     `Type: Number`
- `Field 9`:     Manufacturer             `Type: String`
- `Field 10`:    Reviews                  `Type: [{String: String}]`

Schema: 
```javascript
{
   name: String,
   opened: Number,
   height: Number,
   maxspeed: Number,
   inversions: Number,
   duration: Number,
   length: Number,
   capacity: Number,
   manufac: String,
   reviews: [{String: String}]
}
```

### 2. Add New Data

HTML form route: `/...`

POST endpoint route: `/api/...`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addCoaster/:name/:opened/:height/:maxspeed/:inversions/:duration/:length/:capacity/:manufac',
    headers: { 
      'name': params.name,
      'opened': params.opened,
      'height': params.height,
      'maxspeed': params.maxspeed,
      'inversions': params.inversions,
      'duration': params.duration,
      'length': params.length,
      'capacity': params.capacity,
      'manufac': params.manufac,
    },
    form: { 
       'Name',
       'Manufacturer',
       'Year opened',
       'Height',
       'Top Speed',
       'Number of inversions',
       'Ride duration',
       'Ride length',
       'Capacity',
       'Write a review'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getAll`

### 4. Search Data

Search Field: ...

### 5. Navigation Pages

Navigation Filters
1. All Coasters (alphabetical order) -> `/list`
2. Tallest Coasters                  -> `/height`
3. Fastest Coasters                  -> `/speed`
4. Coasters by the Year              -> `/age`
5. Manufacturers                     -> `/manufacturers`

