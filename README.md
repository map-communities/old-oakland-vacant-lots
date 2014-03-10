City Farm Share: Mapping Vacant Lot Data!
=========================================

The Oakland Community Land Trust (OakCLT) is partnering with a group of volunteers on an initiative called CityFarmShare. The overarching goal of CityFarmShare is to make more land available for community gardening and urban agriculture in Oakland. A group out of NYC [596 Acres.org](http://596acres.org/) has developed a property viewer specifically suited to this kind of work. The code repository is on [GitHub](https://github.com/ebrelsford/596acres), and has recently been adapted for use in [New Orleans](https://livinglotsnola.org) and [Philadelphia](http://groundedinphilly.org/).

It's time to stand up a version of this platform in Oakland. Data from the Alameda County Assessor can likely serve as the main source for parcel info.

# running locally (for now)

Easiest way is to start an http file server (like the following if you have python on your machine):

```bash
python -m SimpleHTTPServer
```

...and then open `localhost:8000`
