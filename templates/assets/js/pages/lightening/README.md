# LightningChart<sup>®</sup> JS

**A high-performance charting library for *JavaScript*.**

## Installation

If you prefer to setup your own project, there are two main ways to get LightningChart.js in your
JavaScript or TypeScript project:

### 1. Install from NPM and use a bundler

Install the library package from [NPM](https://www.npmjs.com/package/@arction/lcjs).

`npm install --save @arction/lcjs`

This package can be used with any bundler that supports CommonJS. Some examples of bundlers that work are [WebPack](https://webpack.js.org/), [Parcel](https://parceljs.org/) and [Rollup](https://rollupjs.org/guide/en).

Check our [getting started video](https://www.arction.com/lightningchart-js-faq/) on LightningChart JS to see this in action.

Any of our [Examples](https://www.arction.com/lightningchart-js-interactive-examples/) can be used as a seed project. All examples on that page have been made to standalone repositories which can be found on our GitGub. [Standalone Example Repositories](https://github.com/Arction?utf8=%E2%9C%93&q=lcjs-example&type=&language=)

### 2. Use IIFE bundle directly on a webpage

The library is distributed with a browser ready IIFE bundle. This bundle can be used directly in browsers with [script tag](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage). You can see an example implementation of this method on our GitHub. [LightningChart JS html usage example.](https://github.com/Arction/lcjs-html-example)

All of our [examples](https://www.arction.com/lightningchart-js-interactive-examples/) can be used in the html page. To use them,
first find an example you want to use from [interactive examples](https://www.arction.com/lightningchart-js-interactive-examples/).
Click `Edit this example`. On the bottom of the page click on the button that reads `CJS`. That will switch our code to be IIFE compatible.
After that, the code can be copied to the html page. See our [LightningChart JS html usage example](https://github.com/Arction/lcjs-html-example) for more detailed information.

## License options

### Non-commercial, Community License

When the library is used without a license, it will run with a LightningChart JS logo on the chart. The logo is a link to the LightningChart JS product page. 

There is a small performance drop when the chart is running without a license key compared to running with a valid license.

### Development License

A development license is required for development in a commercial environment. The license is verified with a license server. Internet connection is required for license verification. Each developer requires own development license. See "[Using a license](#using-a-license)" for how to use the development license. When using a development key, the chart will just like it will in production.

### Deployment License

A deployment license is required for commercial use. The deployment license is provided the same way as a development license. See "[Using a license](#using-a-license)" for how to use the deployment license.

When using a deployment license, the chart will render without the LightningChart JS logo. The deployment license supports a "Deployment Test" domain. If the domain that the library is currently running in matches the deployment test domain specified with the deployment license, the chart will render with a "Deployment Test" text on top of the chart. This domain is meant to support using a staging environment and having the ability to switch to the production version without changing the license.

## Purchasing

Different purchasing options can be found on [our website](https://www.arction.com/lightningchart-js-pricing/).

## Getting started

### Javascript package

The library is distributed as a single *javascript* *module*. Its *exports* can be grouped to two categories:

#### lightningChart

This will be needed for every *lcjs*-application as it is required for creating *Charts*, *Dashboards*, *LegendBoxes*... Its usage is always the same:

```javascript
// Import library.
const { lightningChart } = require('@arction/lcjs')

// Create an instance of lightningChart for creation of charts.
const lc = lightningChart()

// Create charts using methods of 'LightningChart'-interface.
const cartesianChart = lc.ChartXY()
const spiderChart = lc.Spider()
// ...
```

<br/>

##### Using a license

To use your *LightningChart JS* license, you must pass it as an argument to *lightningChart*, like so:

```javascript
// Create an instance of LightningChart for creation of charts.
// ----- Licensed version -----
const lc = lightningChart(myLicenseString)
```

`myLicenseString` can be either a development license for development or a deployment license for deployment.

<br/>

#### Individual exports styles, settings, utilities, builders...

*LightningChart® JS* also includes a bunch of other exports for styling, configuring and interacting with *charts*, building different *UI-elements* and what-not. These can be imported from the *lcjs* module as required:

```javascript
// Import required parts from LightningChart® JS module.
const {
    lightningChart,
    ColorRGBA,
    AxisScrollStrategies
    // ...
} = require('@arction/lcjs')
```

Any entry listed in *LightningChart® JS API Documentation* is importable as in the previous example.

### Example usage

```javascript
const { lightningChart, DataPatterns } = require('@arction/lcjs')

// Create a cartesian chart.
const chart = lightningChart().ChartXY()

// Add a series for rendering a line optimized for progressing by X.
const lineSeries = chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })

// Append point locations. (Note that selected Data Pattern expects them to be progressive by X)
lineSeries.add([
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 45, y: -47 },
    { x: 53, y: 335 },
    { x: 57, y: 26 },
    { x: 62, y: 387 },
    { x: 74, y: 104 },
    { x: 89, y: 0 },
    { x: 95, y: 100 },
    { x: 100, y: 0 }
])
```

## Hierarchy overview

Some general information about the hierarchical structure of the library's main classes.

### Standalone views

There are several types of views specialized on different goals. It is possible to create several independent views in a single page and arrange them in according with your custom positioning logic. Let's discuss every type of view in greater detail.

#### Panel

It is the most primitive type of view. All other views are subclasses of this one. It provides an API for the creation of custom UI elements: labels, checkboxes, button and different combinations of them in a form of tables, columns, etc. UI elements are created by the immutable builder pattern, which let us combine various object in a type safe manner.

Panel has *Panel.addUIElement* method which expects UI element builder as the first argument and optionally a pair of scale as the second one. *UIElementBuilders* is an enum-like object which contains builders for four simple UI elements: *TextBox*, *CheckBox*, *ButtonBox*, *PointableTextBox*. *UILayouts* is an enum-like object which contains builders for aggregators, which can act as containers for simple UI elements. There are two built-in aggregators: *Column* and *Row*. Their combination enables custom tables.

Each builder has a collection of unique setters which can be used to achieve a desired behavior. For example *ButtonBox* has *setBackground()* method which accepts any background object predefined at *UIBackgrounds* enum-like object. Every builder has *addStyler()* method which accept function which modifies newly created UI object. The stylers are stored in a queue, so the last added styler is the last called one. Styling function is used to create builders with the reconfigured appearance or for sharing of the same appearance across multiple objects of the same type. Aggregators can use styling functions to populate itself.

```javascript
panel.addUIElement(
    UIElementBuilders
        .ButtonBox
        .setBackground( UIBackgrounds.Circle )
        .addStyler( ( checkbox ) => 
            checkbox.setText( 'My first check box' )
        )
)
```

#### 2D Charts

There are several available 2D charts. Different kinds of 2D charts have different relationships between types of classes.

###### Series

*Series* represents the data set and renders it on a chart. There are many different types of *Series* with a different representation of data.

It is possible to add new *Series* by the series factory. Each type of *Series* has its own factory, which always returns a new *Series* object. *Series* can be removed from chart by *Series.dispose()* method. Disposing does not destroy the *Series*. It simply removes it from rendering collection, so it can be removed by GC after client loses its reference.  If desired, it can be placed back by *Series.restore()*. 

##### Cartesian Chart

*ChartXY* is the most fundamental type, because it contains the most part of the series. It can be used for drawing of simple lines, mountains, bars and trading graphs, etc. It is highly optimized and can draw humongous amounts of data. The unique feature of the chart type that they are created by a combination of *Series* and *Axis*.

###### Axis

The core responsibility of *Axis* class is a visual representation of a ruler, which is used as a reference for the positioning of data. It contains the main axis line, ticks, nibs, and title. Nib indicates ends of *Axis*. They are surrounded by a clickable area which can be used for modification of *Axis* interval. A tick is formed by:
 
 - Grid line - thick long line directed inside
 - Tick line - thin short line directed outside of the chart
 - Label - value which represents ticks position  

*Axis* has *AxisScrollStrategies* which describes the way how *Axis* adapts to incoming data. The strategies are called as part of *Axis.plot()* execution, which removes old ticks and creates new ticks if needed. 

There are two default axes in every *ChartXY*. Default X *Axis* is placed at the bottom and default Y *Axis* is placed at the left side. They can be requested from *ChartXY* by *getDefaultAxis{X/Y}()* method. 

Additional *Axis* can be added by *ChartXY.addAxis{X/Y}()* function. Unlimited amount of stacked *Axes* can be added to any side of the cartesian chart. They can be removed by *Axis.dispose() and enabled again by *Axis.restore(). Dispose does not destroy an *Axis* object, but it removes it from rendering collection, it also removes all associated *Series*, because they don't make any sense without reference *Axis*.

Each *Axis* object can be individually styled by *Axis* configuration API. There are setters for *FillStyles* and *StrokeStyles* of every axis element.

Cartesian *Axis* supports four *AxisScrollStrategies*:

- Scrolling progressive - *Axis* follows the data set in a positive direction with the unchanged length of axis range.
- Scrolling regressive - *Axis* follows the data set in a negative direction with the unchanged length of axis range.
- Expansion - *Axis* increase the size to fit incoming data.
- Fitting - *Axis* follows the data, so the range can be expanded or reduced in different situations. It tries to achieve the best possible overview of the dataset.

In addition, *AxisScrollStrategy* can also be disabled to allow for manual definition of its interval.

##### Custom Tick

*CustomTick* can be created by using a factory method located at *Axis*. It is formed by a grid line and *TickMarker*. *TickMarker* is a label with pointing background, it is created in according to a provided builder, so it is possible to configure background shape in the way clients wish. *CustomTick* can be removed from *Axis* by *dispose()* method or due to leaving the *Axis* range. *CustomTick* can be placed back to *Axis* by *restore()*.

*CustomTick* can be moved along *Axis* by *setValue()* method, the location is computed based on *Axis*' scale. The *TickMarkers* text is defined by its text-formatting function *number => string*.

###### Series

Cartesian *Series* represents data set in according with two *Axis*, it is associated with. Each *SeriesXY* must be linked to one X and one Y *Axis*. The connection is established during creation. It is used to synchronize *Axis* scaling strategies with related *Series*. New *Series* can be created by a factory function which belongs to *ChartXY*. *Axis* are two first arguments of the method, default *Axes* are used as initial values. Actual factories might have some extra arguments after that. *Series* can be removed by *dispose* function which removes it from rendering collection of the cartesian chart and breaks the connection with *Axes*. 

###### Markers

It is represented by a two intersected *CustomTicks* and *PointMarker* which indicates an intersection point. The marker might belong to specific *Series* or entire *Chart*.

*SeriesMarker* is an essential part of some *Series*. It points to the closest part of the *Series* from a specified client location. It is draggable by *PointMarker* and *TickMarkers*, so it tracks the *Series* along with mouse (or touch) movement. *SeriesMarkers* can be created by a trackable factory which belongs to the API of *Series*. 

*ChartMarker* can be created by factory which is part of *Chart*'s API. It works in exactly similar way as *SeriesMarker* but it does not track any particular *Series*.

Both *Marker* types follow the same builder pattern and dispose/restore patterns as other UI elements. 

###### Auto Cursor

*AutoCursor* constantly follow mouse along closest *Series*. It looks very similar to *SeriesMarker* except that it automatically switches *CustomTicks* from *Axis* to *Axis*.

*AutoCursor* can be configured on *Chart* creation by *autoCursorBuilder*, it can also be styled and configured by *Chart*'s API.

##### Spider

*Spider* is a chart for the representation of multidimensional data. Data should contain values in more than two dimensions. 

###### Axis 

It automatically creates *Axis* for any mentioned in data set category. *Spider* *Axes* have to follow the same appearance, so all *Axis* shares the same configuration which belongs to *SpiderChart* API. *Spider* also has API for manual creation and removing of *Axis*. *Spider Axes* support only *expansion* and *fitting* strategies.

###### Series

*Spider* *Series* is automatically associated with all of the *Axis*. Each category of data at *SpiderSeries* has its own *Axis*. Categories without *Axis* are omitted. There is only one type of *SpiderSeries*. It combines tougher line, points, and area. Each of *Series*'s part can be independently disabled. *Series* can be created by *addSeries()* method. It can be removed by *dispose()* and placed back by *restore()* method. The disposing simply remove the *Series* from rendering collection and restoring returns it.

##### Pie

*Pie* is a chart for representing statistical data. Data should always be a pair of name and value. In *Pie* Chart all of the data is represented as a single circle object. Each individual data is represented as a single part of this overall object, i.e. a slice. The size of each slice is dependant on the relative size of the value when compared to the sum of all values in the Chart.

###### Donut

*Donut* is another way of displaying a *Pie* chart. In fact, the only difference is, the *Donut* chart has a hole cut in the center of the chart.

###### Slice

Each *Slice* is a visual indication of data in a collection of data. For *Pie* and *Donut* charts, each *Slice* can be seen as part of a circular object on screen. As data, however, *Slice* is used to store the name and value of some data.

##### Gauge

*Gauge* is a chart for the representation of statistical data. Most common use-case is to show a value's position in relation to a minimum and maximum value in a linear fashion.

##### Funnel

*Funnel* is a chart for the representation of statistical data. Data is represented as *Slices*, shown in a funnel-like fashion. Value for each *Slice* changes either the width or height of the *Slice*.

##### Pyramid

*Pyramid* is a chart for the representation of statistical data. *Pyramid* functions similar to *Funnel* chart, with the exception that it is always shown with the top of the pyramid being narrow and widening towards the bottom.

#### LegendBox

*LegendBox* can be placed as a standalone rendering context or as a part of an existing *Panel*, *Chart* or *Dashboard*. It is represented by the same *CheckBoxes* which are available as part of UI API. The *CheckBoxes* are joined in groups with a title, which is just a *TextBox*.

An entry for individual *Attachable* object (*Series*, *Chart*, *Dashboard*) can be placed at *LegendBox*. *CheckBox* is returned as a result of the operation. *CheckBox* can be styled after creation or by the supplied builder. A group name can be defined by the second argument of *add()* method. Each *Series* is an individual *Attachable*. Entire *Charts* or *Dashboards* can be added to *LegendBox* at once. *Series* from the same *Chart* are going to be placed at the same category, but it can be overridden by explicitly provided tag name.

*LegendBox Entry* / *CheckBox* can be removed from *LegendBox* via *dispose()* method. It removes it from the group and breaks connections in correspondent *Series*. At the same time *restore()* places it back and establish a connection with *Series* again if it is possible.

*LegendBox* and individual *Entries* in a group can be placed horizontally or vertically. There is no possibility to create any kind of grid or free positioning. The goal can be achieved by manual creation of *LegendBox* via UI at *Panel*.

### Dashboard

It is a common rendering context shared among several *standalone views*. The dashboard contains a grid of cells which are able to contain independent *views*. A single view can be stretched by several cells horizontally or vertically. The grid is separated by splitters, which enables the modification of cells ratio by dragging.

The dashboard has factories for creation of individual *views*. Row, index and spans are specified on creation.

### Animations

All of the charts from *LightningChartJS* have enabled animation by default. It is possible to enable/disable animation effects through different methods depending on the animation type. The list of animations and methods to control is in the table below.

<table style="width: 100%">
  <tr>
    <th width="30%">Chart type</th>
    <th width="25%">Animation type</th>
    <th>Enable/disable method</th>
  </tr>
  <tr valign="top">
    <td>Point series<br>Line series <br>Point line series <br>Area series bipolar <br>Area series monopolar <br>Area series positive <br>Area series negative <br>Spline series <br>Step series <br>Ellipse series <br>Rectangle series <br>OHLC series <br>Box series</td>
    <td>Zooming animation<br><br><br>Axis scrolling animation</td>
    <td><i>setAnimationZoom(easing: AnimationEasing | undefined, duration?: number)</i><br><br><i>setAnimationScroll(enabled: boolean | undefined)</i><br></td>
  </tr>
  <tr valign="top">
    <td>Pie Chart</td>
    <td >Slice angle change<br><br><br>Slice explosions</td>
    <td>The method enables/disables all the animations on the pie chart. Besides, animation cannot be enabled/disabled for individual slices.<br><i>setAnimationsEnabled(animationsEnabled: boolean)</i></td>
  </tr>
  <tr valign="top">
    <td>Spider chart</td>
    <td valign="top">Web changes animation<br><br><br>Add points animation</td>
    <td valign="top">Enable/disable all the animations<br><i>setAnimationsEnabled(animationsEnabled: boolean)</i><br><br>Enable/disable add points animation<br><i>setAnimationAddPoints(easing?: AnimationEasing, duration?: number)</i><br></td>
  </tr>
</table>
