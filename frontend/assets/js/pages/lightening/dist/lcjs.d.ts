
import { Eventer, Token } from "@arction/eventer";
import SortedMap from 'collections/sorted-map';
import SortedSet, { Node } from 'collections/sorted-set';
import Set from 'collections/set';
import { Record } from 'immutable';/**
 * Abstract Chart class represents common logic of Chart2D and Pie.
 * @hidden Internal class
 */
export declare abstract class Chart extends Panel {
    protected readonly _ui: LayerXY;
    /**
     * @param   layerSupplier       LayerSupplier. Must NOT be cached, because it contains reference to actual Engine instance.
     * @param   _bg                 Rendering layer for background
     * @param   _ui                 Rendering layer for Charts own UI-elements. This layer should NOT be used for elements created by users.
     * @param   ScaleX              Injectable Scale constructor
     * @param   ScaleY              Injectable Scale constructor
     * @param   onScaleChange       Injectable subscribe method for when chart should update its positioning logic (used for dashboard)
     * @param   panelMargin         Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, _bg: LayerXY, _ui: LayerXY, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number);
    /**
     * Get minimum size of Chart.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Vec2 minimum size or undefined if unimplemented
     * @hidden
     */
    abstract getMinimumSize(): Point | undefined;
    /**
     * @returns Chart title string
     */
    getTitle(): string;
    /**
     * Specifies an Chart title string
     * @param   title  Chart title as a string
     * @returns        Chart itself for fluent interface
     */
    setTitle(title: string): this;
    /**
     * Set fill style of Chart Title.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                      |
     * | :--------------------- | :-------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })    |
     * | Changed transparency   | (solidFill) => solidFill.setA(80)             |
     * | Hidden                 | *emptyFill*                                   |
     *
     * @param   value   Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns         Chart itself
     */
    setTitleFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Chart Title.
     * @returns FillStyle object
     */
    getTitleFillStyle(): FillStyle;
    /**
     * Set font of Chart Title.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                          |
     * | :--------------------- | :------------------------------------------------ |
     * | Specified FontSettings | new FontSettings({ size: 24, style: 'italic' })   |
     * | Set to **bold**        | (fontSettings) => fontSettings.setWeight('bold')  |
     *
     * @param   value   Either a FontSettings object or a function, which will be used to create a new FontSettings based on current value.
     * @returns         Chart itself
     */
    setTitleFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Chart title.
     * @return  FontSettings object
     */
    getTitleFont(): FontSettings;
    /**
     * @returns Padding before Chart title
     */
    getTitleMarginTop(): number;
    /**
     * Specifies padding before chart title.
     *
     * This does not have an effect if title is hidden (empty FillStyle).
     * @param  marginPixels Gap between the top of chart and its title in pixels.
     * @returns             Chart itself for fluent interface
     */
    setTitleMarginTop: (marginPixels: number) => this;
    /**
     * @returns Padding after Chart title
     */
    getTitleMarginBottom(): number;
    /**
     * Specifies padding after chart title.
     *
     * This does not have an effect if title is hidden (empty FillStyle).
     * @param  marginPixels Gap after the chart title in pixels.
     * @returns             Chart itself for fluent interface
     */
    setTitleMarginBottom: (marginPixels: number) => this;
    /**
     * Set padding around Chart in pixels.
     * @param   padding     Number with pixel margins for all sides or datastructure with individual pixel paddings
     *                      for each side. Any side can be omitted, only passed values will be overridden.
     * @return              Object itself
     */
    setPadding(padding: Partial<Margin> | number): this;
    /**
     * Get padding around Chart in pixels.
     * @return  Padding datastructure
     */
    getPadding(): Margin;
}
/**
 * Enum for selecting behaviour of *AutoCursor* in *Chart*s.
 *
 * Use with *Chart*.**setAutoCursor()**
 */
export declare enum AutoCursorModes {
    /**
     * *AutoCursor* should be disabled.
     */
    disabled = 0,
    /**
     * *AutoCursor* will be active whenever users mouse is inside the *Chart*.
     *
     * It will snap to point at the closest data-point of a *Series* inside the *Chart*.
     */
    snapToClosest = 1,
    /**
     * *AutoCursor* will only be active when users mouse is directly pointing at a *Series* inside the *Chart*.
     */
    onHover = 2
}
/**
 * Abstract base class for charts that have generic auto-cursor and series
 * Currently, it is superclass of ChartXY adn Spider
 * @hidden Internal class
 */
export declare abstract class Chart2D<SeriesType extends Series2D = Series2D, CursorPointMarkerType extends PointMarker = PointMarker, CursorResultTableBackgroundType extends UIBackground = UIBackground, AutoCursorType extends AutoCursor<CursorPointMarkerType, CursorResultTableBackgroundType> = AutoCursor<CursorPointMarkerType, CursorResultTableBackgroundType>> extends Chart {
    /**
     * Set fillStyle of chart background.
     * This is the area enclosed by the axis'.
     * @param   fillStyle   FillStyle or mutator to modify existing one
     * @return              Object itself
     */
    setChartBackgroundFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fillstyle of chart background.
     * This is the area enclosed by the axis'.
     * @return              FillStyle
     */
    getChartBackgroundFillStyle(): FillStyle;
    /**
     * Set stroke of chart background.
     * This is the area enclosed by the axis'.
     * @param   value       LineStyle or mutator to modify existing one
     * @return              Object itself
     */
    setChartBackgroundStroke(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of chart background.
     * This is the area enclosed by the axis'.
     * @return              LineStyle
     */
    getChartBackgroundStroke(): LineStyle;
    /**
     * Mutator function for charts auto cursor.
     * @param   mutator     Mutator function for a Cursor
     * @return              Object itself for fluent interface
     */
    setAutoCursor(mutator: Mutator<AutoCursorType>): this;
    /**
     * @returns Auto cursor object
     */
    getAutoCursor(): AutoCursorType;
    /**
     * Set mode of charts Auto cursor
     * @param   mode    Value from enum AutoCursorMode
     * @returns         Object itself for fluent interface
     */
    setAutoCursorMode(mode: AutoCursorModes): this;
    /**
     * Get current mode of charts Auto cursor
     * @returns         Value from enum AutoCursorMode
     */
    getAutoCursorMode(): AutoCursorModes;
    /**
     * Solves the nearest data-point from series inside Chart of a given coordinate on screen
     * @param   location    Location on screen or omit for cur mouse location
     * @return              Undefined or data-structure for positioning of markers (and cursors)
     */
    solveNearest(location?: Point | undefined): undefined | CursorPoint;
    /**
     * Subscribe to mouse-enter event on Series background
     */
    protected onSeriesBackgroundMouseEnter: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-leave event on Series background
     */
    protected onSeriesBackgroundMouseLeave: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-down event on Series background
     */
    protected onSeriesBackgroundMouseDown: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-up event on Series background
     */
    protected onSeriesBackgroundMouseUp: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-click event on Series background
     */
    protected onSeriesBackgroundMouseClick: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-doubleClick event on Series background
     */
    protected onSeriesBackgroundMouseDoubleClick: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-drag start event on Series background
     */
    protected onSeriesBackgroundMouseDragStart: (handler: MouseDragStartEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-drag event on Series background
     */
    protected onSeriesBackgroundMouseDrag: (handler: MouseDragEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-drag stop event on Series background
     */
    protected onSeriesBackgroundMouseDragStop: (handler: MouseDragStopEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-wheel event on Series background
     */
    protected onSeriesBackgroundMouseWheel: (handler: MouseWheelEventHandler<this>) => Token;
    /**
     * Subscribe to touch start event on Series background
     */
    protected onSeriesBackgroundTouchStart: (handler: TouchEventHandler<this>) => Token;
    /**
     * Subscribe to touch move event on Series background
     */
    protected onSeriesBackgroundTouchMove: (handler: TouchEventHandler<this>) => Token;
    /**
     * Subscribe to touch end event on Series background
     */
    protected onSeriesBackgroundTouchEnd: (handler: TouchEventHandler<this>) => Token;
}
/**
 * Abstract base class for "Chart components".
 * Chart component is defined as a mouse-interactable component of a Chart.
 * ChartComponent is a public class, so users can have access to it.
 * @hidden Internal class
 */
export declare abstract class ChartComponent<VisualType extends ChartVisual = ChartVisual> implements Interactable, Attachable {
    protected readonly _layer: LayerXY;
    protected _chart: Chart;
    protected _removeFromChart: RemoveHandler<ChartComponent>;
    protected _restoreFromChart: RestoreHandler<ChartComponent>;
    /**
     * @param _layer             Rendering layer
     * @param _chart             Chart to which the component belongs
     * @param _removeFromChart   Handler to remove component from chart's collection it belongs to.
     * @param _restoreFromChart  Handler to restore component from chart's collection it belongs to.
     * @hidden
     */
    constructor(_layer: LayerXY, _chart: Chart, _removeFromChart: RemoveHandler<ChartComponent>, _restoreFromChart: RestoreHandler<ChartComponent>);
    /**
     * Sets the name of the Component
     * updating attached LegendBox entries
     * @param   name    Name of the Component
     * @return          Object itself
     */
    setName(name: string): this;
    /**
     * Get the name of the Component.
     * @returns     The name of the Component.
     */
    getName(): string;
    /**
     * @returns  TODO: True for enabled and false for disabled
     */
    isDisposed(): boolean;
    /**
     * Tell the owning chart to remove this component.
     * @return  Object itself.
     */
    dispose(): this;
    /**
     * Tell the owning chart to restore this component.
     * @return  Object itself.
     */
    restore(): this;
    /**
     * Enable or disable forced highlighting of component
     * @param highLight True for enabled and false for disabled
     * @returns         component itself for fluent interface
     */
    setHighlighted(highLight: boolean): this;
    /**
     * @returns the state of highlighted flag
     */
    getHighlighted(): boolean;
    /**
     * Set mouse interactions enabled or disabled.
     * Disabling mouse-interactions will naturally prevent mouse-driven highlighting from ever happening.
     * @param state Specifies state of mouse interactions
     * @return      Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * Get mouse interactions enabled or disabled.
     * Disabled mouse-interactions will naturally prevent mouse-driven highlighting from ever happening.
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
    /**
     * Get boolean flag for whether object is currently under mouse or not
     * @return  Boolean for is object under mouse currently
     */
    getIsUnderMouse(): boolean;
    /**
     * On LegendBox entry mouse enter event listener
     */
    private onEntryMouseEnter;
    /**
     * On LegendBox entry mouse leave event listener
     */
    private onEntryMouseLeave;
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Add event listener to Enter Event
     * @param   clbk    Event listener for Mouse Enter Event
     * @return          Token of the event listener
     */
    onMouseEnter: (clbk: MouseEventHandler<this>) => Token;
    /**
     * Add event listener to Mouse Leave Event
     * @param   clbk    Event listener for Mouse Leave Event
     * @return          Token of the event listener
     */
    onMouseLeave: (clbk: AbruptMouseEventHandler<this>) => Token;
    /**
     * Add event listener to Mouse Click Event
     * @param   clbk    Event listener for Mouse Click Event
     * @return          Token of the event listener
     */
    onMouseClick: (clbk: MouseEventHandler<this>) => Token;
    /**
     * Add event listener to Mouse Double Click Event
     * @param   clbk    Event listener for Mouse Double Click Event
     * @return          Token of the event listener
     */
    onMouseDoubleClick: (clbk: MouseEventHandler<this>) => Token;
    /**
     * Add event listener to Mouse Down Event
     * @param   clbk    Event listener for Mouse Down Event
     * @return          Token of the event listener
     */
    onMouseDown: (clbk: MouseEventHandler<this>) => Token;
    /**
     * Add event listener to Mouse Up Event
     * @param   clbk    Event listener for Mouse Up Event
     * @return          Token of the event listener
     */
    onMouseUp: (clbk: MouseEventHandler<this>) => Token;
    /**
     * Add event listener to Mouse Move Event
     * @param   clbk    Event listener for Mouse Move Event
     * @return          Token of the event listener
     */
    onMouseMove: (clbk: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to Mouse Drag Start event
     */
    onMouseDragStart(clbk: MouseDragStartEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag event
     */
    onMouseDrag(clbk: MouseDragEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag Stop event
     */
    onMouseDragStop(clbk: MouseDragStopEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Wheel event
     * @param   clbk        Event handler function
     * @returns             Token of subscription
     */
    onMouseWheel(clbk: MouseWheelEventHandler<this>): Token;
    /**
     * Subscribe to Touch Start event
     * @param   clbk        Event handler function
     * @returns             Token of subscription
     */
    onTouchStart(clbk: TouchEventHandler<this>): Token;
    /**
     * Subscribe to Touch Move event
     * @param   clbk        Event handler function
     * @returns             Token of subscription
     */
    onTouchMove(clbk: TouchEventHandler<this>): Token;
    /**
     * Subscribe to Touch End event
     * @param   clbk        Event handler function
     * @returns             Token of subscription
     */
    onTouchEnd(clbk: TouchEventHandler<this>): Token;
    /**
     * Remove event listener from Mouse Enter Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseEnter: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Leave Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseLeave: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Click Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseClick: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Double Click Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDoubleClick: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Down Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDown: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Up Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseUp: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Move Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseMove: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Drag Start Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDragStart: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Drag Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDrag: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Drag Stop Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDragStop: (token: Token) => boolean;
    /**
     * Remove event listener from Mouse Wheel Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseWheel: (token: Token) => boolean;
    /**
     * Remove event listener from Touch Start Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchStart(token: Token): boolean;
    /**
     * Remove event listener from Touch Move Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchMove(token: Token): boolean;
    /**
     * Remove event listener from Touch End Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchEnd(token: Token): boolean;
}
/**
 * Interface for ChartVisual.
 * ChartVisuals are a building block which links rendering Engine to a ChartComponent.
 *
 * Examples: An Engine Shape or an UI-element.
 * @hidden
 */
export interface ChartVisual extends Disposable {
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return      Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): ChartVisual;
}
/**
 * Enum for selecting behaviour of user-interaction-triggered highlighting of *Series*.
 *
 * This is currently only usable on *FigureSeries*:
 * - BoxSeries
 * - RectangleSeries
 * - SegmentSeries
 * - ...
 */
export declare enum HighlightModes {
    /**
     * Highlighting is not affected by user-interactions.
     */
    noHighlighting = 0,
    /**
     * When any part of a *Series* is interacted with, the whole *Series* is highlighted.
     */
    onHover = 1,
    /**
     * When a part of a *Series* is interacted with, that part will be highlighted.
     */
    onHoverIndividual = 2
}
/**
 * File contains interface of a "Control".
 *
 * Meaning a stand-alone Charting component, which owns a rendering Engine.
 * Eq. Panel, Dashboard, ...
 */
/**
 * Abstract super class for a Control.
 * Meaning a stand-alone Charting component, which owns a rendering Engine.
 * Eq. Panel, Dashboard, ...
 * @hidden Internal class
 */
export declare abstract class Control {
    /**
     * Public, safe interface of rendering engine.
     */
    readonly abstract engine: PublicEngine;
    /**
     * Add a stand-alone *UIElement* using a *builder*.
     *
     * @typeparam   UIElementType   Type of *UIElement* that is specified by 'builder'-*parameter*.
     *
     * @param       builder *UIElementBuilder*. If omitted, *TextBoxBuilder* will be selected. Use **UIElementBuilders** for selection.
     * @param       scale   Optional custom scale to position UIElement on. Defaults to whole component in percentages [0, 100].
     * @returns             Object that fulfills *interfaces*:  *UIElementType* (typeparam) and *UIElement*
     */
    abstract addUIElement<UIElementType extends UIPart = UITextBox>(uiElementBuilder?: UIElementBuilder<UIElementType>, scale?: Vec2<Scale>): UIElementType & UIElement;
    /**
     * Capture rendered state in an image file. Prompts the browser to download the created file.
     *
     * **NOTE: The download might be blocked by browser/plugins as harmful.**
     * To prevent this, only call the method in events tied to user-interactions.
     * From mouse-event handlers, for example.
     *
     * Has two optional parameters which directly reference JavaScript API HTMLCanvasElement.toDataURL.
     * For supported image formats, compression quality, Etc. refer to:
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
     *
     * Example usage:
     *
     * | Desired result                                                 | Arguments                                         |
     * | :------------------------------------------------------------- | :------------------------------------------------ |
     * | Download 'screenshot.png'                                      | 'screenshot'                                      |
     * | Attempt download 'maybeNotSupported.bmp'                       | 'maybeNotSupported', 'image/bmp'                  |
     * | Attempt download jpeg.file with specified compression quality  | 'fileName', 'image/jpeg', 0.50                    |
     *
     * @sideEffect              **If 'type' is not supported by browser, an Error will be thrown.**
     *
     * @param   fileName        Name of prompted download file as string. **File extension shouldn't be included**
     *                          as it is automatically detected from 'type'-argument.
     * @param   type            A DOMString indicating the image format. The default format type is image/png.
     * @param   encoderOptions  A Number between 0 and 1 indicating the image quality to use for image formats
     *                          that use lossy compression such as image/jpeg and image/webp. If this argument is anything else,
     *                          the default value for image quality is used. The default value is 0.92.
     */
    saveToFile(fileName: string, type?: string, encoderOptions?: number): this;
}
/**
 * Interface specifies the amount of rows and columns a *Dashboard* should have.
 *
 * Example usage:
 *
 * | Desired result                         | Value                                                                     |
 * | :------------------------------------- | :------------------------------------------------------------------------ |
 * | *Dashboard* with 2 columns and 3 rows  | { **numberOfColumns**: 2, **numberOfRows**: 3 }                         |
 */
export interface DashboardOptions {
    /**
     * Number of columns the dashboard should allocate - horizontal amount of cells.
     */
    readonly numberOfColumns: number;
    /**
     * Number of rows the dashboard should allocate - vertical amount of cells.
     */
    readonly numberOfRows: number;
}
/**
 *  Interface specifies basic options which all Dashboard.create methods have to implement.
 *
 *  Example usage:
 *
 * | Desired result                                 | Value                                                                     |
 * | :--------------------------------------------- | :------------------------------------------------------------------------ |
 * | 1x1 component at top left cell                 | { **columnIndex: 0, rowIndex: 0, columnSpan: 1, rowSpan: 1** }            |
 * | 4x1 component at top row                       | { **columnIndex: 0, rowIndex: 0, columnSpan: 4, rowSpan: 1** }            |
 */
export interface DashboardBasicOptions {
    /**
     * Column index on dashboard (X location, 0 = left)
     */
    columnIndex: number;
    /**
     * Row index on dashboard (Y location, 0 = top)
     */
    rowIndex: number;
    /**
     * Column span (X width)
     */
    columnSpan: number;
    /**
     * Row span (Y height)
     */
    rowSpan: number;
}
/**
 * Interface that can be used to define *ChartXY* configurations, when inside a *Dashboard*,
 * that can't be changed after creation. For example:
 *
 * - Specifying TickStrategies for default X or Y Axes'. This is mostly used for creating DateTime Axes.
 *
 * - Supplying a custom Builder for the AutoCursor of Chart. This can be used to modify the AutoCursor on a level,
 * which can't be done during runtime. For example, changing the shape of ResultTable Background, Etc.
 *
 *  Example usage:
 *
 * | Desired result                                 | Value                                                                                                                     |
 * | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
 * | Default                                        | *undefined*                                                                                                               |
 * | Default X Axis as DateTime                     | { chartXYOptions: { **defaultAxisXTickStrategy:** *AxisTickStrategies*.DateTime() } }                                     |
 * | Specified AutoCursor ResultTable Background    | { chartXYOptions: { **autoCursorBuilder:** *AutoCursorBuilders*.XY.setResultTableBackground(*UIBackgrounds*.Circle) } }   |
 */
export interface ChartOptions<CursorPointMarkerType extends PointMarker, CursorResultTableBackgroundType extends UIBackground, CursorTickMarkerXBackgroundType extends PointableBackground, CursorTickMarkerYBackgroundType extends PointableBackground> extends DashboardBasicOptions {
    /**
     * Options object for creation of chart.
     */
    chartXYOptions?: ChartXYOptions<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerXBackgroundType, CursorTickMarkerYBackgroundType>;
}
/**
 * Interface that can be used to define *SpiderChart* configurations, when inside a *Dashboard*,
 * that can't be changed after creation.
 *
 *  Example usage:
 *
 * | Desired result                                 | Value                                                                                                                             |
 * | :--------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
 * | Specified AutoCursor ResultTable Background    | { spiderChartOptions: { **autoCursorBuilder:** *AutoCursorBuilders*.Spider.setResultTableBackground(*UIBackgrounds*.Circle) } }   |
 */
export interface SpiderOptions<CursorPointMarkerType extends PointMarker, CursorResultTableBackgroundType extends UIBackground> extends DashboardBasicOptions {
    /**
     * Options object for creation of chart.
     */
    spiderChartOptions?: SpiderChartOptions<CursorPointMarkerType, CursorResultTableBackgroundType>;
}
/**
 * Interface that can be used to define *PieChart* configurations, when inside a *Dashboard*, that can't be changed after creation.
 *
 *  Example usage:
 *
 * | Desired result                         | Value                                                                               |
 * | :------------------------------------- | :---------------------------------------------------------------------------------- |
 * | *Pie Chart* with default type          | *undefined*                                                                         |
 * | *Pie Chart* with specified type        | { pieChartOptions: { **type:** *PieChartTypes*.PieChartWithLabelsOnSides } }        |
 */
export interface PieOptions<PieChartType extends PieChartTypes> extends DashboardBasicOptions {
    /**
     * Options object for creation of chart.
     */
    pieOptions?: PieChartOptions<PieChartType>;
}
/**
 * Interface that can be used to define *FunnelChart* configurations, when inside a *Dashboard*, that can't be changed after creation.
 *
 *  Example usage:
 *
 * | Desired result                         | Value                                                                               |
 * | :------------------------------------- | :---------------------------------------------------------------------------------- |
 * | *Funnel Chart* with default type       | *undefined*                                                                         |
 * | *Funnel Chart* with specified type     | { funnelOptions: { **type:** *FunnelChartTypes*.LabelsOnSides } }                   |
 */
export interface FunnelOptions<FunnelChartType extends FunnelChartTypes> extends DashboardBasicOptions {
    /**
     * Options object for creation of chart.
     */
    funnelOptions?: FunnelChartOptions<FunnelChartType>;
}
/**
 * Interface that can be used to define *PyramidChart* configurations, when inside a *Dashboard*, that can't be changed after creation.
 *
 * Example usage:
 *
 * | Desired result                         | Value                                                                     |
 * | :------------------------------------- | :-------------------------------------------------------------------------|
 * | *Pyramid Chart* with default type      | *undefined*                                                               |
 * | *Pyramid Chart* with specified type    | { pyramidOptions: { type: **PyramidChartTypes.LabelsInsideSlices** } }    |
 */
export interface PyramidOptions<PyramidChartType extends PyramidChartTypes> extends DashboardBasicOptions {
    /**
     * Options object for creation of chart
     */
    pyramidOptions?: PyramidChartOptions<PyramidChartType>;
}
/**
 * Interface that can be used to define *GaugeChart* configurations, when inside a *Dashboard*, that can't be changed after creation.
 *
 *  Example usage:
 *
 * | Desired result                         | Value                                                         |
 * | :------------------------------------- | :------------------------------------------------------------ |
 * | *Gauge Chart* with default type        | *undefined*                                                   |
 * | *Gauge Chart* with specified type      | { gaugeOptions: { **type:** *GaugeChartTypes*.Solid } }       |
 */
export interface GaugeOptions<GaugeChartType extends GaugeChartTypes> extends DashboardBasicOptions {
    /**
     * Options object for creation of chart
     */
    gaugeOptions?: GaugeChartOptions<GaugeChartType>;
}
/**
 *  Interface specifies the options for creating a LegendBox inside a *Dashboard*.
 *
 *  Example usage:
 *
 * | Desired result                         | Value                                                                     |
 * | :------------------------------------- | :------------------------------------------------------------------------ |
 * | Create a *Horizontal LegendBox*        | { **legendBoxBuilder:** UIElementBuilders.HorizontalLegendBox }           |
 */
export interface LegendBoxOptions<TitleType extends UITextBox = UITextBox, EntryType extends LegendBoxEntry = LegendBoxEntry> extends DashboardBasicOptions {
    /**
     * Builder that specifies functionality of created LegendBox.
     */
    legendBoxBuilder?: UILegendBoxBuilder<UIEmptyBackground, TitleType, EntryType>;
}
/**
 * *Dashboard* is a component for flexible positioning of multiple *Chart*s efficiently.
 *
 * Upon its creation an amount of *columns* and *rows* is specified. *Charts* and other components can
 * then be placed in cells with given *column* and *row*-locations and sizes
 * (using methods of *Dashboard*. For example: *Dashboard*.**createChartXY()**).
 *
 * The *Dashboard* will distribute the available space for *columns* and *rows*, which users can resize
 * with mouse and touch interactions.
 */
export declare class Dashboard extends Control implements Validatable {
    /**
     * Public, safe interface for Dashboards rendering engine.
     */
    readonly engine: PublicEngine;
    /**
     * @param   dashboardOptions    Settings union used to define dashboard.
     * @param   engine              Injectable engine
     * @param   logoFactory         Logo factory.
     * @hidden
     */
    constructor(dashboardOptions: DashboardOptions, engine: Engine, logoFactory?: LogoFactory);
    /**
     * Set the minimum and maximum boundaries for dashBoard horizontal size.
     * @param boundary  Single value for static engine size, or a tuple for size range [min, max] in pixels.
     */
    setWidth(boundary: number | [number | undefined, number | undefined] | undefined): this;
    /**
     * Set the minimum and maximum boundaries for dashBoard vertical size.
     * @param boundary  Single value applied to both minimum and maximum size, or a tuple for [min, max] size in pixels.
     */
    setHeight(boundary: number | [number | undefined, number | undefined] | undefined): this;
    /**
     * Get the minimum and maximum horizontal boundaries used for the Dashboard.
     * @return Horizontal boundaries as a tuple [minSize, maxSize]
     */
    getWidth(): [number | undefined, number | undefined] | undefined;
    /**
     * Get the minimum and maximum vertical boundaries used for the Dashboard.
     * @return Vertical boundaries as a tuple [minSize, maxSize]
     */
    getHeight(): [number | undefined, number | undefined] | undefined;
    /**
     * Set fillStyle of dashboard background.
     * @param   fillStyle   FillStyle or mutator to modify existing one
     * @return              Object itself
     */
    setBackgroundFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fillstyle of dashboard
     * @return              FillStyle
     */
    getBackgroundFillStyle(): FillStyle;
    /**
     * Set stroke style of dashboard background.
     * @param   value       LineStyle
     * @return              Object itself
     */
    setBackgroundStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of dashboard background.
     * @return              LineStyle
     */
    getBackgroundStrokeStyle(): LineStyle;
    /**
     * Set width of a column. By default column widths are equal.
     *
     * Example usage:
     *
     * | Desired result                             | Value                                                                 |
     * | :----------------------------------------- | :---------------------------------------------------------------------|
     * | Dashboard with 3 columns                   | dashboard.setColumnWidth( 0, 1 )                                      |
     * | Where columns are distributed as follows:  | dashboard.setColumnWidth( 1, 1 )                                      |
     * | (20%, 20%, 60%) of dashboard width         | dashboard.setColumnWidth( 2, 3 )                                      |
     *
     * @param index             Index of the column (starts from 0)
     * @param relativeWidth     Relative width of the column
     */
    setColumnWidth(index: number, relativeWidth: number): this;
    /**
     * Set height of a row. By default row heights are equal.
     *
     * Example usage:
     *
     * | Desired result                         | Value                                                                     |
     * | :------------------------------------- | :------------------------------------------------------------------------ |
     * | Dashboard with 3 rows                  | dashboard.setRowHeight( 0, 1 )                                            |
     * | Where rows are distributed as follows: | dashboard.setRowHeight( 1, 1 )                                            |
     * | (20%, 20%, 60%) of dashboard width     | dashboard.setRowHeight( 2, 3 )                                            |
     *
     * @param index             Index of the row (starts from 0)
     * @param relativeHeight    Relative height of the row
     */
    setRowHeight(index: number, relativeHeight: number): this;
    /**
     * Use mapping function on all charts inside dashboard.
     * Dashboard filters any other types of cells out.
     * @param   clbk Map function for Chart
     */
    mapCharts<T>(clbk: (chart: Chart) => T): T[];
    /**
     * Use forEach function on charts inside dashboard.
     * Dashboard filters any other types of cells out.
     * @param   clbk forEach function for Chart
     */
    forEachChart(clbk: (chart: Chart) => void): void;
    /**
     * Add a stand-alone *UIElement* using a *builder*.
     *
     * @typeparam   UIElementType   Type of *UIElement* that is specified by 'builder'-*parameter*.
     *
     * @param   uiElementBuilder    *UIElementBuilder*. If omitted, *TextBoxBuilder* will be selected.
     *                              Use **UIElementBuilders** for selection.
     * @param   scale               Optional custom scale to position UIElement on. Defaults to whole Dashboard in percentages [0, 100].
     * @returns                     Object that fulfills *interfaces*:  *UIElementType* (typeparam) and *UIElement*
     */
    addUIElement<UiElementType extends UIPart = UITextBox>(uiElementBuilder?: UIElementBuilder<UiElementType>, scale?: Vec2<Scale>): UiElementType & UIElement;
    /**
     * Add a stand-alone *LegendBox* using a *builder*.
     *
     * @typeparam   UIElementType   Type of *UIElement* that is specified by 'builder'-*parameter*.
     *
     * @param       legendBoxBuilder    *UIElementBuilder*. If omitted, *Horizontal LegendBoxBuilder* will be selected.
     *                                  Use **LegendBoxBuilders** for selection.
     * @param       scale               Optional custom scale to position UIElement on. Defaults to whole Dashboard in percentages [0, 100].
     * @returns                         Object that fulfills *interfaces*:  *UIElementType* (typeparam) and *UIElement*
     */
    addLegendBox<UiElementType extends UIPart = UILegendBox>(legendBoxBuilder?: UIElementBuilder<UiElementType>, scale?: Vec2<Scale>): UiElementType & UIElement;
    /**
     * Add new ChartXY to dashboard at specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboards numberOfColumns/Rows.
     * @param    options   Options object for creating a chartXY.
     * @return             ChartXY.
     */
    createChartXY: <CursorPointMarkerType extends PointMarker, CursorResultTableBackgroundType extends UIBackground, CursorTickMarkerXBackgroundType extends PointableBackground, CursorTickMarkerYBackgroundType extends PointableBackground>(options: ChartOptions<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerXBackgroundType, CursorTickMarkerYBackgroundType>) => ChartXY<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerXBackgroundType, CursorTickMarkerYBackgroundType>;
    /**
     * Add new SpiderChart to dashboard at specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboards numberOfColumns/Rows.
     * @param    options   Options object for creating a Spiderchart.
     * @return             SpiderChart.
     */
    createSpiderChart: <CursorPointMarkerType extends PointMarker, CursorResultTableBackgroundType extends UIBackground>(options: SpiderOptions<CursorPointMarkerType, CursorResultTableBackgroundType>) => SpiderChart<CursorPointMarkerType, CursorResultTableBackgroundType>;
    /**
     * Add new PieChart to dashboard at specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboards numberOfColumns/Rows.
     * @param    options   Options object for creating a PieChart.
     * @return             PieChart.
     */
    createPieChart: <PieChartType extends PieChartTypes = typeof PieChartWithLabelsOnSides>(options: PieOptions<PieChartType>) => InstanceType<PieChartType>;
    /**
     * Add new FunnelChart to dashboard at specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboards numberOfColumns/Rows.
     * @param    options   Options object for creating a FunnelChart.
     * @return             FunnelChart.
     */
    createFunnelChart: <FunnelChartType extends FunnelChartTypes = typeof FunnelChartWithLabelsOnSides>(options: FunnelOptions<FunnelChartType>) => InstanceType<FunnelChartType>;
    /**
     * Add new PyramidChart to dashboard at specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboard's numberOfColumns/Rows.
     * @param   options     Options object for creating a PyramidChart.
     * @returns             PyramidChart
     */
    createPyramidChart: <PyramidChartType extends PyramidChartTypes = typeof PyramidChartWithLabelsOnSides>(options: PyramidOptions<PyramidChartType>) => InstanceType<PyramidChartType>;
    /**
     * Create a container for UI objects on dashboard with specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboards numberOfColumns/Rows.
     * @param    options   Options object for creating a UIPanel.
     * @return             Panel.
     */
    createUIPanel: (options: DashboardBasicOptions) => UIPanel;
    /**
     * Create a new LegendBoxPanel to dashboard at specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboards numberOfColumns/Rows.
     * @param    options   Options object for creating a LegendBox.
     * @return             LegendBoxPanel.
     */
    createLegendBoxPanel: <TitleType extends UITextBox = UITextBox, EntryType extends LegendBoxEntry = LegendBoxEntry>(options: LegendBoxOptions<TitleType, EntryType>) => UILegendBoxPanel<TitleType, EntryType>;
    /**
     * Add new GaugeChart to dashboard at specified location and span.
     *
     * Throws an error if either column/row index is less than 0 or index + span is more than Dashboards numberOfColumns/Rows.
     * @param    options   Options object for creating a GaugeChart.
     * @return             GaugeChart.
     */
    createGaugeChart: <GaugeChartType extends GaugeChartTypes = typeof SolidGauge>(options?: GaugeOptions<GaugeChartType>) => InstanceType<GaugeChartType>;
}
/**
 * Dedicated *Panel* for *LegendBox*.
 *
 * Can also house other *UIElements*, just like any other *Panel* or *Chart*.
 */
export declare class UILegendBoxPanel<TitleType extends UITextBox = UITextBox, DefaultEntryType extends LegendBoxEntry = LegendBoxEntry> extends UIPanel implements LegendBox<TitleType, DefaultEntryType> {
    /**
     * @param   layerSupplier       Layer supplier
     * @param   logoFactory         Logo factory
     * @param   ScaleX              Injectable Scale constructor
     * @param   ScaleY              Injectable Scale constructor
     * @param   onScaleChange       Injectable subscribe method for when chart should update its positioning logic (used for dashboard)
     * @param   margin              Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @param   legendBoxBuilder    Builder for creation of LegendBox.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number, legendBoxBuilder?: UILegendBoxBuilder<InternalBackground, TitleType, DefaultEntryType>);
    /**
     * @return Legendbox minimum x & y dimensions as Vec2.
     */
    getMinimumSize(): undefined;
    /**
     * Add a dynamic value to LegendBox, creating a group and entries for it depending on type of value.
     * Supports series, charts and dashboards.
     * @param value             Series, Chart or Dashboard
     * @param disposeOnClick    Optional flag that determines whether clicking the LegendBoxEntry will dispose the Attached objects
     * @param tag               Optional group name
     * @param builder           Optional builder for custom entry
     * @return                  Entry attached to a Series or Collection of Entries in case of Chart or Dashboard
     */
    add<EntryType extends LegendBoxEntry = DefaultEntryType>(value: Attachable | Chart | Dashboard, disposeOnClick?: boolean, tag?: string, builder?: UIElementBuilder<EntryType>): EntryType | EntryType[] | EntryType[][];
}
/**
 * Cursor-based visual that can be plotted on a Chart.
 * Like Cursors its built of two parts:
 * PointMarker and ResultTable, first of which
 * shows the location of the Marker clearly and the second
 * to display information about the pointed DataPoint.
 * @hidden
 */
export interface Marker<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, CursorType extends Cursor<PointMarkerType, ResultTableBackgroundType>> extends Draggable {
    /**
     * Set visibility mode for PointMarker.
     * PointMarker is a visual that is displayed at the Cursors position.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setPointMarkerVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for PointMarker.
     * PointMarker is a visual that is displayed at the Cursors position.
     * @return                  VisibilityMode
     */
    getPointMarkerVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for ResultTable.
     * ResultTable is a visual that displays currently pointed data next to its location.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setResultTableVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for ResultTable.
     * ResultTable is a visual that displays currently pointed data next to its location.
     * @return                  VisibilityMode
     */
    getResultTableVisibility(): UIVisibilityModes;
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return      Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
    /**
     * Set auto-fit strategy of Cursor.
     * Affects logic of automatic fitting of Cursors ResultTable to the screen.
     * @param   autoFitStrategy     AutoFitStrategy factory or undefined to disable auto-fitting
     * @returns                     Object itself for fluent interface
     */
    setAutoFitStrategy(autoFitStrategy?: AutoFitStrategyFactory<ResultTableBackgroundType>): this;
    /**
     * Get is auto-fit enabled.
     * Affects logic of automatic fitting of Cursors ResultTable to the screen.
     * @returns                     Boolean flag whether auto-fit is enabled
     */
    getAutoFitStrategy(): boolean;
}
/**
 * Cursor-based visual that can be plotted on a Chart.
 * Like Cursors its built of two parts:
 * PointMarker and ResultTable, first of which
 * shows the location of the Marker clearly and the second
 * to display information about the pointed DataPoint.
 * @hidden Internal class
 */
export declare abstract class ChartMarker<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, CursorType extends InternalStaticCursor<PointMarkerType, ResultTableBackgroundType> = InternalStaticCursor<PointMarkerType, ResultTableBackgroundType>> implements Marker<PointMarkerType, ResultTableBackgroundType, CursorType>, Disposable {
    /**
     * Set the position of Annotation on its scale.
     * @param   position    Position on Annotations scale.
     */
    setPosition(position: Point): this;
    /**
     * Get current position of Annotation
     * @return              Position on Annotations scale
     */
    getPosition(): Point;
    /**
     * Set visibility mode for PointMarker.
     * PointMarker is a visual that is displayed at the Cursors position.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setPointMarkerVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for PointMarker.
     * PointMarker is a visual that is displayed at the Cursors position.
     * @return                  VisibilityMode
     */
    getPointMarkerVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for ResultTable.
     * ResultTable is a visual that displays currently pointed data next to its location.
     * NOTE: ResultTable is only visible when it has displayable content, regardless of its VisibilityMode!
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setResultTableVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for ResultTable.
     * ResultTable is a visual that displays currently pointed data next to its location.
     * @return                  VisibilityMode
     */
    getResultTableVisibility(): UIVisibilityModes;
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return      Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
    /**
     * Set auto-fit strategy of Cursor.
     * Affects logic of automatic fitting of Cursors ResultTable to the screen.
     * @param   autoFitStrategy     AutoFitStrategy factory or undefined to disable auto-fitting
     * @returns                     Object itself for fluent interface
     */
    setAutoFitStrategy(autoFitStrategy?: AutoFitStrategyFactory<ResultTableBackgroundType>): this;
    /**
     * Get is auto-fit enabled.
     * Affects logic of automatic fitting of Cursors ResultTable to the screen.
     * @returns                     Boolean flag whether auto-fit is enabled
     */
    getAutoFitStrategy(): boolean;
    /**
     * @returns True if object is attached or not attachable, false if it is not attached and attachable
     */
    isAttached(): boolean;
    /**
     * Points the Marker at a given CursorPoint.
     * Updating its position and displayed data.
     */
    pointAt(cursorPoint: CursorPoint): this;
    /**
     * Dispose this Marker from owner's collection.
     */
    dispose(): this;
    /**
     * Restore the marker to parent and the marker's cursor ( and its elements ).
     * @return Marker itself.
     */
    restore(): this;
    /**
     * @return True if Cursor has been disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Mutator function for PointMarker.
     * PointMarker is a visual that is displayed at the Cursors position
     * @param   mutator     Mutator function for PointMarker
     * @return              Object itself for fluent interface
     */
    setPointMarker(mutator: Mutator<PointMarkerType>): this;
    /**
     * Get PointMarker object.
     * PointMarker is a visual that is displayed at the Cursors position
     * @returns             PointMarker object
     */
    getPointMarker(): PointMarkerType;
    /**
     * Mutator function for ResultTable.
     * ResultTable is a visual that displays currently pointed data next to its location
     * @param   mutator     Mutator function for ResultTable
     * @return              Object itself for fluent interface
     */
    setResultTable(mutator: Mutator<ResultTable<ResultTableBackgroundType>>): this;
    /**
     * Get ResultTable object.
     * ResultTable is a visual that displays currently pointed data next to its location
     * @returns             ResultTable object
     */
    getResultTable(): ResultTable<ResultTableBackgroundType>;
    /**
     * Set dragging mode of object. Defines how the object can be dragged by mouse.
     *
     * See **UIDraggingModes**-collection for options.
     * @param       draggingMode    DraggingMode or undefined to disable dragging
     * @returns                     Object itself
     */
    setDraggingMode(draggingMode?: UIDraggingModes): this;
    /**
     * Get dragging mode of object.
     * Defines how the object can be dragged by mouse.
     * @returns                     Object itself
     */
    getDraggingMode(): UIDraggingModes;
}
/**
 * Simple ChartMarker implementation for 2D Charts.
 * Like Cursors its built of two parts:
 * PointMarker and ResultTable, first of which
 * shows the location of the Marker clearly and the second
 * to display information about the pointed DataPoint.
 * @hidden Internal class
 */
export declare class ChartMarker2D<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground> extends ChartMarker<PointMarkerType, ResultTableBackgroundType, InternalStaticCursor<PointMarkerType, ResultTableBackgroundType>> {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    protected _removeMarker: (marker: ChartMarker) => void;
    protected _restoreMarker: (marker: ChartMarker) => void;
    /**
     * @param _layer        Rendering layer
     * @param scale         Rendering scale
     * @param CursorBuilder CursorBuilder that defines look of chartMarker
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, CursorBuilder: StaticCursor2DBuilder<PointMarkerType, ResultTableBackgroundType>, _removeMarker: (marker: ChartMarker) => void, _restoreMarker: (marker: ChartMarker) => void);
}
/**
 * Type of factory for a Scale
 * @return              Scale
 * @hidden
 */
export declare type ScaleFactory = () => Scale;
/**
 * Abstract base class for charts and UI panels
 * @hidden Internal class
 */
export declare abstract class Panel extends Control {
    /**
     * Public, safe interface for Panels rendering engine.
     */
    readonly engine: PublicEngine;
    /**
     * Scale for panel area in percentages (0-100).
     * Margin should be set according to panel margin (currently constant).
     */
    uiScale: Vec2<Scale>;
    /**
     * Scale for panel area in pixels.
     * Margin should be set according to panel margin (currently constant).
     */
    pixelScale: Vec2<Scale>;
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Point minimum size or undefined if unimplemented
     */
    abstract getMinimumSize(): Point | undefined;
    /**
     * Set fillStyle of panel background.
     * @param   value       FillStyle or function which modifies it
     * @return              Object itself
     */
    setBackgroundFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fillstyle of chart background.
     * @return              FillStyle
     */
    getBackgroundFillStyle(): FillStyle;
    /**
     * Set stroke style of panel background.
     * @param   value       LineStyle or function which modifies it
     * @return              Object itself
     */
    setBackgroundStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of chart background.
     * @return              LineStyle
     */
    getBackgroundStrokeStyle(): LineStyle;
    /**
     * Add a stand-alone *UIElement* using a *builder*.
     *
     * @typeparam   UIElementType   Type of *UIElement* that is specified by 'builder'-*parameter*.
     *
     * @param       builder *UIElementBuilder*. If omitted, *TextBoxBuilder* will be selected. Use **UIElementBuilders** for selection.
     * @param       scale   Optional custom scale to position UIElement on. Defaults to whole chart in percentages [0, 100].
     * @returns             Object that fulfills *interfaces*:  *UIElementType* (typeparam) and *UIElement*
     */
    addUIElement<UIElementType extends UIPart = UITextBox>(builder?: UIElementBuilder<UIElementType>, scale?: Vec2<Scale>): UIElementType & UIElement;
    /**
     * Add a stand-alone *LegendBox* using a *builder*.
     *
     * @typeparam   UIElementType   Type of *UIElement* that is specified by 'builder'-*parameter*.
     *
     * @param       builder *LegendBoxBuilder*. If omitted, *HorizontalLegendBox* will be selected. Use **LegendBoxBuilders** for selection.
     * @param       scale   Optional custom scale to position LegendBox on. Defaults to whole chart in percentages [0, 100].
     * @returns             LegendBox that fulfills *interfaces*:  *UIElementType* (typeparam) and *UIElement*
     */
    addLegendBox<UIElementType extends UIPart = UILegendBox>(builder?: UIElementBuilder<UIElementType>, scale?: Vec2<Scale>): UIElementType & UIElement;
    /**
     * Subscribe to mouse-enter event on Panel background
     */
    protected onPanelBackgroundMouseEnter: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-leave event on Panel background
     */
    protected onPanelBackgroundMouseLeave: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-down event on Panel background
     */
    protected onPanelBackgroundMouseDown: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-up event on Panel background
     */
    protected onPanelBackgroundMouseUp: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-click event on Panel background
     */
    protected onPanelBackgroundMouseClick: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-doubleClick event on Panel background
     */
    protected onPanelBackgroundMouseDoubleClick: (handler: MouseEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-drag start event on Panel background
     */
    protected onPanelBackgroundMouseDragStart: (handler: MouseDragStartEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-drag event on Panel background
     */
    protected onPanelBackgroundMouseDrag: (handler: MouseDragEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-drag stop event on Panel background
     */
    protected onPanelBackgroundMouseDragStop: (handler: MouseDragStopEventHandler<this>) => Token;
    /**
     * Subscribe to mouse-wheel event on Panel background
     */
    protected onPanelBackgroundMouseWheel: (handler: MouseWheelEventHandler<this>) => Token;
    /**
     * Subscribe to touch-start event on Panel background
     */
    protected onPanelBackgroundTouchStart: (handler: TouchEventHandler<this>) => Token;
    /**
     * Subscribe to touch-move event on Panel background
     */
    protected onPanelBackgroundTouchMove: (handler: TouchEventHandler<this>) => Token;
    /**
     * Subscribe to touch-end event on Panel background
     */
    protected onPanelBackgroundTouchEnd: (handler: TouchEventHandler<this>) => Token;
    /**
     * Subscribe to resize event of Panel.
     * @param   handler         Handler function for event
     * @param   obj             Panel itself
     * @param   width           Width of panel in pixels
     * @param   height          Height of panel in pixels
     * @param   engineWidth     Width of panels rendering engine in pixels
     * @param   engineHeight    Height of panels rendering engine in pixels
     * @return                  Token of subscription
     */
    onResize: (handler: (obj: this, width: number, height: number, engineWidth: number, engineHeight: number) => void) => Token;
    /**
     * Remove event listener from resize event.
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offResize: (token: Token) => boolean;
}
/**
 * Class for a panel that can have UI elements added into it.
 */
export declare class UIPanel extends Panel {
    /**
     * @param   layerSupplier       Layer supplier
     * @param   logoFactory         Logo factory.
     * @param   ScaleX              Injectable Scale constructor
     * @param   ScaleY              Injectable Scale constructor
     * @param   onScaleChange       Injectable subscribe method for when chart should update its positioning logic (used for dashboard)
     * @param   panelMargin         Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @param   logoLayer           Layer to use for logo, if the chart was created on a dashboard.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number);
    /**
     * Set minimum size of UIPanel in pixels.
     * This will affect its resizability by dragging dashboard splitters.
     * @param   minimumSize Minimum size as Point pixels
     */
    setMinimumSize(minimumSize: Point): this;
    /**
     * Get minimum size of UIPanel in pixels as set by user.
     * @return  Point minimum size in pixels or undefined
     */
    getMinimumSize(): Point | undefined;
}
/**
 * Base class for a major group of ChartComponents - Series.
 * Adds Cursor / solveNearest logic.
 * @hidden Internal class
 */
export declare abstract class Series2D<VisualType extends ChartVisual = ChartVisual, CursorPointInterface extends CursorPoint<Series2D> = any> extends ChartComponent<VisualType> {
    /**
     * Scale of the Series.
     * Necessary for translation of datapoints
     */
    abstract readonly scale: Vec2<Scale>;
    /**
     * Abstract method that solves the nearest datapoint to a given coordinate on screen.
     * @param   location    Location on screen
     * @return              Undefined or data-structure for positioning of cursors
     */
    abstract solveNearestFromScreen(location: Point): undefined | CursorPointInterface;
    /**
     * Abstract method that solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    abstract solveNearestFromSegment(location: Point, segment: ChartVisual): undefined | CursorPointInterface;
    /**
     * Set whether Cursor is enabled or not
     */
    setCursorEnabled(state: boolean): this;
    /**
     * @returns Whether Cursor is enabled or not
     */
    getCursorEnabled(): boolean;
    /**
     * Add event listener to Series Hover Event.
     * Hover event is a custom mouse-event designed for Series that is the main link between Cursors and Series.
     * @param   clbk            Callback function that is called whenever mouse enters / moves or leaves the Series
     *
     * @param   series          Series itself
     * @param   cursorPoint     Interface for positioning Cursors on Series or undefined if mouse left Series.
     * @return                  Token of the event listener
     */
    onHover: (clbk: (series: this, cursorPoint: CursorPointInterface | undefined) => void) => Token;
    /**
     * Remove event listener from Series Hover Event.
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offHover: (token: Token) => boolean;
}
/**
 * Type of Animation Factory
 * @param   values          Array of start and end animation values
 * @param   action          Function for handling of interframe modification
 * @param   customDuration  Override default duration of animation
 */
export declare type AnimationFactory = (values: Array<[number, number]>, action: AnimationFrameCallback, customDuration?: number) => Animation;
/**
 * Animator factory.
 *
 * **Unpolished API, usage can be copied from Examples set but it is not further encouraged**.
 * @param afterUpdate   After all animation update callback
 * @param fps           Desirable frame rate for all animations (Limited to around 60fps by browser)
 */
export declare const Animator: (afterUpdate: () => void, fps?: number) => (duration?: number, easing?: AnimationEasing) => AnimationFactory;
/**
 * Class for animation handling
 * @property    delta           Delta time from start of animation
 * @property    eases           Array of Eases animation functions
 * @property    nextAnimations  Queue of future animations
 * @property    action          Function for handling of interframe modification
 * @property    duration        Animation duration in milliseconds
 * @property    easing          Ease animation function factory
 */
export declare class Animation {
    private readonly _values;
    readonly action: AnimationFrameCallback;
    readonly duration: number;
    readonly easing: AnimationEasing;
    private readonly _animations;
    delta: number;
    eases: Array<Ease>;
    /**
     * @param   _values      Array of start and end animation values
     * @param   action      Function for handling of interframe modification
     * @param   duration    Animation Duration in milliseconds
     * @param   easing      Ease Animation function factory. See Easings for a collection of options.
     */
    constructor(_values: Array<[number, number]>, action: AnimationFrameCallback, duration: number, easing: AnimationEasing, _animations: Array<Animation>);
    /**
     * Starts an animation
     * @return Object itself for fluent interface
     */
    start(): this;
    /**
     * Add animations which has to be executed subsequently
     * @param   animations  Subsequent Animation or Array of them
     * @return           Object itself for fluent interface
     */
    addNextAnimations(animations: Animation | Array<Animation>): this;
    /**
     * Add and create animation which has to be executed subsequently
     * @param   values      Array of start and end animation values
     * @param   action      Function for handling of interframe modification
     * @return              new Animation
     */
    NextAnimation(values: Array<[number, number]>, action: AnimationFrameCallback, duration?: number): Animation;
    /**
     * Subscribe on current animation end event
     * @param action Event listener
     * @return       Token of the event listener
     */
    onAnimationEnd(action: (nextAnimation?: Animation) => void, token?: Token): Token;
    /**
     * Subscribe on every subsequent animations end event
     * @param action Event listener
     * @return       Token of the event listener
     */
    onEveryAnimationEnd(action: (nextAnimation?: Animation) => void, token?: Token): Token;
    /**
     * Subscribe on all subsequent animations end event
     * @param action Event listener
     * @return       Token of the event listener
     */
    onAllAnimationEnd(action: VoidFunction, token?: Token): Token;
    /**
     * Remove all listeners from Animation End Event
     * @return  Object itself for fluent interface
     */
    allOffAnimationEnd(): this;
    /**
     * Remove all listeners from Every Animation End Event
     * @return  Object itself for fluent interface
     */
    allOffEveryAnimationEnd(): this;
    /**
     * Remove all listeners from All Animation End Event
     * @return  Object itself for fluent interface
     */
    allOffAllAnimationEnd(): this;
    /**
     * Remove a listener from Animation End Event
     * @param   token   Token of the listener
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offAnimationEnd(token: Token): boolean;
    /**
     * Remove a listener from Every Animation End Event
     * @param   token   Token of the listener
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offEveryAnimationEnd(token: Token): boolean;
    /**
     * Remove a listener from All Animation End Event
     * @param   token   Token of the listener
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offAllAnimationEnd(token: Token): boolean;
    /**
     * Finnish current animation and start the next one on the sequnce
     * @param   emitEvents   Flag that tells whether the function should emit any events
     * @return  Future animations or undefined
     */
    finish(emitEvents?: boolean): Animation | undefined;
    /**
     * Finish all animations
     * @param   emitEvents   Flag that tells whether the function should emit any events
     */
    finishAll(emitEvents?: boolean): void;
    /**
     * Get is animation over and there are no queued animations
     */
    isOver: () => boolean;
    /**
     * Get final value of queued animations
     * @returns Final values of the animations
     */
    getFinalValues(): number[];
    /**
     * Get time until all queued animations will finish
     */
    getTimeUntilFinish(): number;
}
/**
 * Function for handling of interframe modification
 * @param   values  Values calculated by Ease function
 */
export declare type AnimationFrameCallback = (values: Array<number>) => void;
/**
 * Ease Animation function
 * @param   delta   Delta time from start of animation
 * @hidden
 */
export declare type Ease = (delta: number) => number;
/**
 * Interface for *Animation* Easing.
 *
 * See **AnimationEasings** for a collection of default options.
 * @param   start       Starting value of the animation
 * @param   end         End value of the animation
 * @param   duration    Animation Duration in milliseconds
 */
export declare type AnimationEasing = (start: number, end: number, duration: number) => Ease;
/**
 * **AnimationEasing** collection to use with *Animator*.
 */
export declare const AnimationEasings: {
    linear: AnimationEasing;
    easeIn: AnimationEasing;
    easeOut: AnimationEasing;
    ease: AnimationEasing;
};
/**
 * Interface that can be used to configure rendering Engine of *Charts* and other *LCJS* components.
 *
 * Example usage:
 *
 * | Desired result                             | Value                                     |
 * | :----------------------------------------- | :---------------------------------------- |
 * | Automatically generated DIV on document    | *undefined*                               |
 * | Embed Engine in a DOM element              | { **containerId:** 'dashboard_div_id' }   |
 */
export declare type EngineOptions = EngineSettings & (FitEngineToDiv | DimensionalEngineSize);
/**
 * Interface specifies settings for Engine.
 */
export interface EngineSettings {
    /**
     * Max FPS (frames-per-second).
     * Setting this will postpone rendering events that would otherwise happen, if it would result in FPS higher than the value.
     *
     * NOTE: This property can't be used to accurately specify actual FPS as it is dictated by the browser. The purpose for 'maxFps' is
     * to limit unnecessary rendering loads where they are not needed.
     */
    readonly maxFps?: number;
    /**
     * Set preference for antialising.
     *
     * If set to true or undefined and browser supports antialising then the chart will be antialiased. If set to false or browser doesn't
     * support antialising then the chart will not be antialiased.
     */
    readonly antialias?: boolean;
}
/**
 * Interface specifies that Engine should not think about its own size and simply fit itself into
 * an existing element on the document, which should be created by user.
 */
export interface FitEngineToDiv {
    /**
     * ID of the DOM element that will contain Engine.
     * If there is no such element found on the document, an uncatchable error will be thrown.
     */
    readonly containerId?: string;
}
/**
 * Interface specifies individual sizes for each dimension - width and height.
 */
export interface DimensionalEngineSize {
    /**
     * Specifies width of engine.
     */
    readonly width?: EngineDimension;
    /**
     * Specifies height of engine.
     */
    readonly height?: EngineDimension;
}
/**
 * Type of dimension for engine; can be a tuple of boundaries, a single static dimension or undefined for container size.
 * When using a tuple to specify boundaries [min, max], actual size for engine will be the size of its container clamped to the specified
 * pixel boundaries. Any of the values inside the tuple can be undefined.
 * Using a single number will set a static size for engine dimension, meaning no resizing of engine will take effect.
 */
export declare type EngineDimension = [number | undefined, number | undefined] | undefined | number;
/**
 * Factory for creating a Color object given individual values for Red, Green, Blue and optionally Alpha -channels.
 * Values are from 0 to 255.
 *
 * Color objects are seldom used independently, but rather used to form more sophisticated Settings-objects, such as:
 * - FillStyles
 * - LineStyles
 * @param     r     Red from 0 to 255
 * @param     g     Green from 0 to 255
 * @param     b     Blue from 0 to 255
 * @param     a     Alpha from 0 to 255
 * @return          Color object
 */
export declare const ColorRGBA: (r: number, g: number, b: number, a?: number) => Color;
/**
 * Factory for creating a Color object given a hexadecimal-formatted string. Supports following input formats:
 * - #AARRGGBB
 * - #RRGGBB
 * - #ARGB
 * - #RGB
 *
 * Other formats will throw an Error!
 *
 * Color objects are seldom used independently, but rather used to form more sophisticated Settings-objects, such as:
 * - FillStyles
 * - LineStyles
 * @param   hexColor    Hexadecimal value for constructing a Color. Eq. #FF0000 = Red
 * @return              Color object
 */
export declare const ColorHEX: (hexColor: string) => Color;
/**
 * Factory for creating a Color object from HSV values.
 *
 * Color objects are seldom used independently, but rather used to form more sophisticated Settings-objects, such as:
 * - FillStyles
 * - LineStyles
 * @param   hue         Hue in range [0, 360].
 * @param   saturation  Saturation in range [0, 1]. Defaults to 1
 * @param   value       Value in range [0, 1]. Defaults to 1
 * @return              Color object
 */
export declare const ColorHSV: (hue: number, saturation?: number, value?: number) => Color;
/**
 * Interface for formatting values on a 'range'.
 * @hidden
 */
export interface FormattingRange {
    /**
     * Get min value on range
     * @return  Number
     */
    getInnerStart(): number;
    /**
     * Get max value on range
     * @return  Number
     */
    getInnerEnd(): number;
}
/**
 * Type of a formatting function.
 * @param   value           Value on range to format
 * @param   range           FormattingRange
 * @return                  Value formated as string
 * @hidden
 */
export declare type FormattingFunction = (value: number, range: FormattingRange) => string;
/**
 * Enum-like object for implementations of default Formatting functions.
 * @hidden
 */
export declare const FormattingFunctions: {
    /**
     * Formats a number.
     * @param   value           Value on range to format
     * @param   range           FormatingRange
     * @param   decimalCount    Optional fixed count of parsed decimals. If omitted, will be computed based on ranges interval.
     * @return                  Value formated as string
     */
    _Numeric: (value: number, range: FormattingRange, decimalCount?: number | undefined) => string;
    /**
     * Formats a number by range-dependant rounding and usage of units.
     * @param   value           Value on range to format
     * @param   range           FormatingRange
     * @return                  Value formated as string with units
     */
    _NumericUnits: (value: number, range: FormattingRange) => string;
    /**
     * Factory for creating DateTime formating function based on origin date.
     * @param   origin          Origin date (the earliest date that is formatable by the function). Drastically affects the achievable
     *                          DateTime precision. The created function expects incoming values to be offset from this 'origin' Date.
     * @param   locale          Valid javascript Date locale string, that specifies a geographical, political or cultural region.
     * @param   options         Valid javascript Intl.DateTimeFormat options object, that specifies a weekday, year, month and day formats.
     *                          If formatting *options* are specified, they are used always, otherwise formatting is based on scale range
     *
     * Formats a number presentation of date-time to string.
     * @param   value           DateTime presented as number
     * @param   range           FormatingRange
     * @return                  Value formated as date-time
     */
    _DateTime: (origin: Date, locale: string | undefined, options: Intl.DateTimeFormatOptions | undefined) => (value: number, range: FormattingRange) => string;
};
/**
 * Interface for a data-structure which represents a 2-dimensional location.
 */
export interface Point {
    /**
     * Location in X-dimension.
     */
    readonly x: number;
    /**
     * Location in Y-dimension.
     */
    readonly y: number;
}
/**
 * Interface for a data-structure which reprents a 2-dimensional location and an associated Color.
 *
 * This can be used for Point-based series for coloring each point individually, when combined with usage of IndividualPointFill-style.
 */
export interface ColorPoint extends Point {
    /**
     * Color that should be used to fill the rendered Point.
     */
    readonly color: Color;
}
/**
 * Interface for a data-structure which represents a 2-dimensional location, but with one of the planes
 * having two values instead of just one to create an area in the given location.
 *
 * Used to supply points to AreaRangeSeries.
 */
export interface AreaPoint {
    /**
     * Position of Point.
     */
    readonly position: number;
    /**
     * High value of Point in the given position.
     */
    readonly high: number;
    /**
     * Low value of Point in the given position.
     */
    readonly low: number;
}
/**
 * Interface for a data-structure which represents a measurement of four sides.
 * Has number properties for:
 * - left
 * - top
 * - right
 * - bottom
 *
 * This data-structure is mainly used for specifying Chart paddings and UIElement paddings/margins.
 *
 * Duplicate of Padding.
 */
export interface Margin {
    /**
     * Left value.
     */
    readonly left: number;
    /**
     * Top value.
     */
    readonly top: number;
    /**
     * Right value.
     */
    readonly right: number;
    /**
     * Bottom value.
     */
    readonly bottom: number;
}
/**
 * Interface for a data-structure which represents a measurement of four sides.
 * Has number properties for:
 * - left
 * - top
 * - right
 * - bottom
 *
 * This data-structure is mainly used for specifying Chart paddings and UIElement paddings/margins.
 *
 * Duplicate of Margin.
 */
export declare type Padding = Margin;
/**
 * Interface that just specifies the ability to remove shapes.
 */
export interface Removable {
    /**
     * Remove everything related to the object from all collections associated
     * with rendering cycle and allows the object to be collected by GC
     * @return Object itself for fluent interface
     */
    dispose: () => this;
    /**
     * @return True if object and all of its sub-objects/elements have been disposed, false if not.
     */
    isDisposed: () => boolean;
}
/**
 * Interface that just specifies the ability to remove and restore shapes.
 * @hidden
 */
export interface Disposable extends Removable {
    /**
     * Restore everything required for correct life cycle of the object
     * @return Object itself for fluent interface
     */
    restore: () => this;
}
/**
 * Decoration for normal number. Indicates that the value should be interpreted as amount of pixels.
 * @hidden
 */
export declare type pixel = number;
/**
 * Type of a mutator function for abstract object.
 * Function provides functionality for modifying an object.
 * @param   object  Object to mutate
 */
export declare type Mutator<T> = (object: T) => void;
/**
 * Type of a mutator function for abstract, immutable object.
 * Function provides functionality for creating a new object based on an existing one.
 * @param   object  Reference object
 * @return          New object
 */
export declare type ImmutableMutator<T, B = T> = (object: T) => B;
/**
 * Enum for selecting shape of points for Point-based *Series*.
 * Supported by:
 * - *PointSeries*
 * - *PointLineSeries*
 * - *SpiderSeries*
 *
 * This must be specified when the *Series* is created, and can't be changed afterwards.
 */
export declare enum PointShape {
    /**
     * Square shape.
     */
    Square = 0,
    /**
     * Circle shape.
     */
    Circle = 1,
    /**
     * Triangle shape.
     */
    Triangle = 2
}
/**
 * Type of an abstract Palette function.
 * NOTE: It is common for applications dealing with Palettes to assume that they are continuous,
 * meaning that when supplied an overflowing index, it will return loop back to start.
 * @param   index   Index of item to pick from Palette
 * @return          Generated item
 */
export declare type Palette<T> = (index: number) => T;
/**
 * Type of an abstract Palette factory.
 * @param   length  Length of Palette
 * @return          Palette of specified length
 */
export declare type PaletteFactory<T> = (length: number) => Palette<T>;
/**
 * Collection of default *Color* *PaletteFactories*.
 *
 * Items are mostly functions that take a single argument, *length*, and return a *Color* *Palette* of that given length.
 *
 * *Color* *Palettes* are functions that give a *Color* based on a given *index*.
 */
export declare const ColorPalettes: {
    warm: PaletteFactory<Color>;
    cold: PaletteFactory<Color>;
    fullSpectrum: PaletteFactory<Color>;
    reverseSpectrum: PaletteFactory<Color>;
    flatUI: PaletteFactory<Color>;
    arction: PaletteFactory<Color>;
    arctionWarm: PaletteFactory<Color>;
    sector: (start: number, end: number, saturation?: number, vibrance?: number) => PaletteFactory<Color>;
};
/**
 * Linear scale with margins
 */
export declare class Scale extends Validator implements Validatable, FormattingRange {
    /**
     * @return Size of cell which scale represents
     */
    getCellSize(): number;
    /**
     * @return Inner scale end value
     */
    getInnerEnd(): number;
    /**
     * @return Inner scale start value
     */
    getInnerStart(): number;
    /**
     * @returns Scale pixel size
     */
    getPixelSize(): number;
    /**
     * @return distance between min and max value with out margins
     */
    getInnerInterval(): number;
}
/**
 * Translates a *Point* from one *Scale* to another.
 * @param   value           Point
 * @param   originScale     Scale of value
 * @param   targetScale     Target Scale for translation
 * @return                  value translated to targetScale
 */
export declare const translatePoint: (value: Point, originScale: Vec2<Scale>, targetScale: Vec2<Scale>) => Point;
/**
* Factory for creating a SolidFill palette.
* @param  colorPalettes   Collection of default colors from PaletteFactory
* @param  amount          Amount of colors in the palette
* @return                 A new SolidFill palette
*/
export declare const SolidFillPalette: (colorPalettes: PaletteFactory<Color>, amount: number) => Palette<FillStyle>;
/**
 * Function for initializing the LightningChart library.
 *
 * Returns an *object*, with properties for creating different *Charts* and components.
 * See *LightningChart*-interface for all available properties.
 *
 * @param   license Optional development or deployment license. If omitted, a community license will be used.
 * @return          A *LightningChart* object for creating *Charts* and components.
 */
export declare const lightningChart: (license?: string | undefined) => LightningChart;
/**
 * File contains interfaces of charting component factories.
 */
/**
 * Interface for factories of Charting components.
 *
 * Each property of this interface is a Factory for creating LCJS components.
 * They are functions which all have one parameter (might be optional), which is used to pass options to the created component.
 *
 * All components are able to handle the options defined by interface: EngineOptions, which can be used to setup the rendering environment
 * for the component. Most 
 */
export interface LightningChart {
    /**
     * Factory for Dashboard.
     * Dashboard allows placement of multiple Charts, sharing a common rendering engine between them.
     * It also enables users to resize the cells with mouse/touch interaction.
     *
     * Example usage:
     *
     * | Desired result                         | Usage                                                                     |
     * | :------------------------------------- | :------------------------------------------------------------------------ |
     * | Dashboard with 2 columns and 3 rows    | *Dashboard*({ **numberOfColumns**: 2, **numberOfRows**: 3 })              |
     * | Dashboard embedded in a DOM element    | *Dashboard*({ **...**, **containerId:** 'dashboard_div_id' })             |
     *
     * When creating a Dashboard the Factory MUST be supplied with an object which fulfills the DashboardOptions-interface.
     * This object can also optionally contain properties of EngineOptions.
     * @param   options     Options for creation of Dashboard and optionally also for its rendering Engine.
     * @return              Dashboard
     */
    Dashboard: (options: EngineOptions & DashboardOptions) => Dashboard;
    /**
     * Factory for ChartXY.
     * This chart visualizes the data using the Cartesian coordinate system.
     * It has a multitude of methods for adding various types of Series.
     *
     * This Factory can be supplied with an options object, which - along with EngineOptions - can also contain properties of
     * ChartXYOptions-interface, which can be used for:
     *  - Specifying TickStrategies for default X or Y Axes'.
     *    This is mostly used for creating DateTime Axes.
     *
     *  - Supplying a custom Builder for the AutoCursor of Chart.
     *    This can be used to modify the AutoCursor on a level, which can't be done during runtime.
     *    For example, changing the shape of ResultTable Background, Etc.
     *
     * Example usage:
     *
     * | Desired result                             | Usage                                             |
     * | :----------------------------------------- | :------------------------------------------------ |
     * | ChartXY with default AutoCursor and Axes   | *ChartXY*()                                       |
     * | ChartXY embedded in a DOM element          | *ChartXY*({ **containerId:** 'chart_div_id' })    |
     *
     * More *ChartXY*-specific examples can be found in documentation of *ChartXYOptions*.
     * @param   options     Optional options for creation of Chart and its rendering engine
     * @return              ChartXY
     */
    ChartXY: <CursorPointMarkerType extends PointMarker, CursorResultTableBackgroundType extends UIBackground, CursorTickMarkerBackgroundTypeX extends PointableBackground, CursorTickMarkerBackgroundTypeY extends PointableBackground>(options?: EngineOptions & ChartXYOptions<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerBackgroundTypeX, CursorTickMarkerBackgroundTypeY>) => ChartXY<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerBackgroundTypeX, CursorTickMarkerBackgroundTypeY>;
    /**
     * Factory for SpiderChart.
     * This chart visualizes data in a radial form as dissected by named axes.
     *
     * This Factory can be supplied with an options object, which - along with EngineOptions - can also contain properties of
     * SpiderChartOptions-interface, which can be used for:
     *  - Supplying a custom Builder for the AutoCursor of Chart.
     *    This can be used to modify the AutoCursor on a level, which can't be done during runtime.
     *    For example, changing the shape of ResultTable Background, Etc.
     *
     * Example usage:
     *
     * | Desired result                         | Usage                                             |
     * | :------------------------------------- | :------------------------------------------------ |
     * | Spider Chart with default AutoCursor   | *Spider*()                                        |
     * | Spider Chart embedded in a DOM element | *Spider*({ **containerId:** 'chart_div_id' })     |
     *
     * More *Spider Chart*-specific examples can be found in documentation of *SpiderChartOptions*.
     * @param   options     Optional options for creation of Chart and its rendering engine
     * @return              SpiderChart
     */
    Spider: <CursorPointMarkerType extends PointMarker, CursorResultTableBackgroundType extends UIBackground>(options?: EngineOptions & SpiderChartOptions<CursorPointMarkerType, CursorResultTableBackgroundType>) => SpiderChart<CursorPointMarkerType, CursorResultTableBackgroundType>;
    /**
     * Factory for PieChart.
     * This chart visualizes proportions and percentages between categories,
     * by dividing a circle into proportional segments.
     *
     * This Factory can be supplied with an options object, which - along with EngineOptions - can also contain properties of
     * PieChartOptions-interface, which can be used for:
     * - Specifying "type" for Pie Chart.
     *
     * Example usage:
     *
     * | Desired result                         | Usage                                                                 |
     * | :------------------------------------- | :-------------------------------------------------------------------- |
     * | Pie Chart with default type            | *Pie*()                                                               |
     * | Pie Chart with specified type          | *Pie*({ **type:** *PieChartTypes*.PieChartWithLabelsOnSides })        |
     * | Pie Chart embedded in a DOM element    | *Pie*({ **containerId:** 'chart_div_id' })                            |
     *
     * More *Pie Chart*-specific examples can be found in documentation of *PieChartOptions*.
     * @param   options     Optional options for creation of Chart and its rendering engine
     * @return              PieChart with type specified via 'options'
     */
    Pie: <PieChartType extends PieChartTypes = typeof PieChartWithLabelsOnSides>(options?: EngineOptions & PieChartOptions<PieChartType>) => InstanceType<PieChartType>;
    /**
     * Factory for GaugeChart.
     * Gauge charts indicate where your data point(s) falls over a particular range.
     * This chart type is often used in executive dashboard reports to show key business indicators.
     *
     * This Factory can be supplied with an options object, which - along with EngineOptions - can also contain properties of
     * GaugeChartOptions-interface, which can be used for:
     * - Specifying "type" for Gauge Chart.
     *
     * Example usage:
     *
     * | Desired result                         | Parameter                                       |
     * | :------------------------------------- | :-----------------------------------------------|
     * | Gauge Chart with default type          | *undefined* or omitted                          |
     * | Gauge Chart with specified type        | { **type:** *GaugeChartTypes*.Solid }           |
     * | Gauge Chart embedded in a DOM element  | { **containerId:** 'chart_div_id' }             |
     *
     * More *Gauge Chart*-specific examples can be found in documentation of *GaugeChartOptions*.
     * @param   options     Optional options for creation of Chart and its rendering engine
     * @return              GaugeChart with type specified via 'options'
     */
    Gauge: <GaugeChartType extends GaugeChartTypes = typeof SolidGauge>(options?: EngineOptions & GaugeChartOptions<GaugeChartType>) => InstanceType<GaugeChartType>;
    /**
     * Factory for FunnelChart.
     * This chart visualizes proportions and percentages between categories,
     *
     * This Factory can be supplied with an options object, which - along with EngineOptions - can also contain properties of
     * FunnelChartOptions-interface, which can be used for:
     * - Specifying "type" for Funnel Chart.
     *
     * Example usage:
     *
     * | Desired result                         | Usage                                                          |
     * | :------------------------------------- | :--------------------------------------------------------------|
     * | Funnel Chart with default type         | *Funnel*()                                                     |
     * | Funnel Chart with specified type       | *Funnel*({ **type:** *FunnelChartTypes*.LabelsOnSides })       |
     * | Funnel Chart embedded in a DOM element | *Funnel*({ **containerId:** 'chart_div_id' })                  |
     *
     * More *Funnel Chart*-specific examples can be found in documentation of *FunnelChartOptions*.
     * @param   options     Optional options for creation of Chart and its rendering engine
     * @return              FunnelChart with type specified via 'options'
     */
    Funnel: <FunnelChartType extends FunnelChartTypes = typeof FunnelChartWithLabelsOnSides>(options?: EngineOptions & FunnelChartOptions<FunnelChartType>) => InstanceType<FunnelChartType>;
    /**
     * Factory for PyramidChart.
     * This chart visualizes proportions and percentages between categories,
     *
     * This Factory can be supplied with an options object, which - along with EngineOptions - can also contain properties of
     * PyramidChartOptions-interface, which can be used for:
     * - Specifying "type" for Pyramid Chart.
     *
     * Example usage:
     *
     * | Desired result                             | Usage                                                         |
     * | :-------------------------------------     | :------------------------------------------------------------ |
     * | Pyramid Chart with default type            | *Pyramid*()                                                   |
     * | Pyramid Chart with specified type          | *Pyramid*({ **type:** *PyramidChartTypes*.LabelsOnSides })    |
     * | Pyramid Chart embedded in a DOM element    | *Pyramid*({ **containerId:** 'chart_div_id' })                |
     *
     * More *Pyramid Chart*-specific examples can be found in documentation of *PyramidChartOptions*.
     * @param   options     Optional options for creation of Chart and its rendering engine
     * @return              PyramidChart with type specified by 'options'
     */
    Pyramid: <PyramidChartType extends PyramidChartTypes = typeof PyramidChartWithLabelsOnSides>(options?: EngineOptions & PyramidChartOptions<PyramidChartType>) => InstanceType<PyramidChartType>;
    /**
     * Factory for UIPanel.
     * This component simply allows the anchoring of user-made UIElements.
     *
     * Can optionally be supplied with an options object that fulfills the
     * EngineOptions-interface. This can be used to setup the rendering environment of the Panel.
     *
     * Example usage:
     *
     * | Desired result                     | Usage                                              |
     * | :--------------------------------- | :------------------------------------------------- |
     * | UIPanel                            | *UIPanel*()                                        |
     * | UIPanel embedded in a DOM element  | *UIPanel*({ **containerId:** 'panel_div_id' })     |
     * @param   options     Optional options for creation of Panels rendering engine
     * @return              UIPanel
     */
    UIPanel: (options?: EngineOptions) => UIPanel;
}
/**
 * Factory for creation of Engine.
 * Handles application of different engine restrictions based on whether suite is for development or production
 * @param   engineOptions  Settings union for Engine.
 * @return                  Engine object.
 */
export declare type EngineFactory = (engineOptions?: EngineOptions) => Engine;
/**
 * Type of LayerSupplier factory.
 * @param   componentIndex  Index of component to create layer supplier for
 * @return                  LayerSupplier object
 * @hidden
 */
export declare type LayerSupplierFactory = (componentIndex: number) => LayerSupplier;
/**
 * Interface for object that is used for supplying rendering layers for charting components.
 * @hidden
 */
export interface LayerSupplier {
}
export {};
/**
 * Interface which can be used to interact with a created Logo.
 */
export interface LogoHandle {
}
/**
 * Logo factory. Takes scale used by a chart to properly render the logo for that chart.
 * @return  LogoHandle interface for interacting with created Logo.
*/
export declare type LogoFactory = (scale: Vec2<Scale>) => LogoHandle;
/**
 * Interface for public parts of engine.
 */
export interface PublicEngine {
    /**
     * HTML Div element that contains the rendering Engine.
     */
    container: HTMLDivElement;
    /**
     * Scale of Engine. (Screen)
     */
    scale: Vec2<Scale>;
    /**
     * Set Mouse style.
     * @param   presetName  Name of a Mouse preset in js.
     * @param   existingKey Key for existing request to refresh
     * @return              Key that can be used to restore Mouse style
     */
    setMouseStyle: (presetName: string, existingKey?: number) => number;
    /**
     * Restore Mouse style.
     * @param   key     Key generated using 'setMouseStyle'
     */
    restoreMouseStyle: (key: number) => void;
    /**
     * Translates client location (that originates at top-left of browser) to engines
     * space (originated at engine canvas' bottom-left)
     * @param   x   Location of X in browser
     * @param   y   Location of Y in browser
     */
    clientLocation2Engine(x: number, y: number): Point;
    /**
     * Translates engine location (originated at engine canvas' bottom-left) to client space (that originates at top-left of browser).
     * @param   x   Location of X in engine
     * @param   y   Location of Y in engine
     */
    engineLocation2Client(x: number, y: number): Point;
    /**
     * Capture state of rendering Engines canvas. Returns the captured image as a Blob-object.
     *
     * Has two optional parameters which directly reference JavaScript API HTMLCanvasElement.toDataURL:
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
     *
     * @param   type            A DOMString indicating the image format. The default format type is image/png.
     * @param   encoderOptions  A Number between 0 and 1 indicating the image quality to use for image formats
     *                          that use lossy compression such as image/jpeg and image/webp. If this argument is anything else,
     *                          the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
     * @return                  JavaScript Blob whose 'type' depends on what was passed to 'type' parameter of this method.
     *                          Defaults to image/png
     */
    captureFrame(type?: string, encoderOptions?: number): Blob;
}
/**
 * Constants
 * @hidden Internal class
 */
export declare abstract class Engine implements Validatable {
    /**
     * @param options   EngineOptions
     */
    constructor(options?: EngineOptions);
}
/**
 * Enum for choosing of right mouse click event type
 */
export declare enum MouseClickEventType {
    click = 0,
    dbclick = 1,
    mouseDown = 2,
    mouseUp = 3,
    contextmenu = 4,
    wheel = 5
}
/**
 * Enum for choosing of right touch event type
 */
export declare enum TouchEventType {
    touchStart = 0,
    touchMove = 1,
    touchEnd = 2
}
/**
 * Any kind of object which can be rendered by Engine
 * @hidden Internal class
 */
export declare abstract class Element<T extends Engine> extends Validator {
    protected readonly _engine: T;
    /**
    * @param   _engine      Rendering engine
    * @param   depthIndex  Number of depth layier there the object is located
    */
    constructor(_engine: T);
}
/**
 * Any kind of object which can be rendered by Engine
 * @hidden Internal class
 */
export declare abstract class Entity<T extends Engine = Engine> extends Element<T> implements Disposable {
    readonly _engine: T;
    protected readonly _remove: RemoveHandler<Entity<T>>;
    protected readonly _restore: RestoreHandler<Entity<T>>;
    /**
    * @param   _engine      Rendering engine
    */
    constructor(_engine: T, _remove: RemoveHandler<Entity<T>>, _restore: RestoreHandler<Entity<T>>);
    /**
     * Dispose this Entity from the collection of entities in the layer it belongs to.
     */
    dispose(): this;
    /**
     * Restore this Entity back to the collection of entities in the layer it belonged to.
     */
    restore(): this;
    /**
     * Get the current state of this Entity's isDisposed flag.
     * @return True if Entity is disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Set are shapes mouse interactions enabled.
     * @param isMouseInteractionEnabled Boolean
     */
    setMouseInteractions(isMouseInteractionEnabled: boolean): this;
    /**
     * Get are shapes mouse interactions enabled.
     * @return  Boolean
     */
    getMouseInteractions(): boolean;
    /**
     * Get if entity is under mouse
     * @return Boolean
     */
    getIsUnderMouse(): boolean;
    /**
     * Returns a boolean that describes if this Entity is currently 'grabbed' by the mouse (ex. pressed down on mouse)
     */
    getIsGrabbed(): boolean;
    /**
     * Set if entity is under mouse
     * @param state
     */
    setIsUnderMouse(state: boolean): this;
    /**
     * Set handler for Mouse Move Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseMoveEventHandler(clbk: MouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Enter Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseEnterEventHandler(clbk: MouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Leave Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseLeaveEventHandler(clbk: AbruptMouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Click Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseClickEventHandler(clbk: MouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Double Click Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseDoubleClickEventHandler(clbk: MouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Down Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseDownEventHandler(clbk: MouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Up Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseUpEventHandler(clbk: MouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Wheel Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseWheelEventHandler(clbk: MouseWheelEventHandler<this>): this;
    /**
     * Set handler for Mouse ContextMenu Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseContextMenuEventHandler(clbk: MouseEventHandler<this>): this;
    /**
     * Set handler for Mouse Drag Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseDragEventHandler(clbk: MouseDragEventHandler<this>): this;
    /**
     * Set handler for Mouse Drag Start Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseDragStartEventHandler(clbk: MouseDragStartEventHandler<this>): this;
    /**
     * Set handler for Mouse DragRelease Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setMouseDragStopEventHandler(clbk: MouseDragEventHandler<this>): this;
    /**
     * Set handler for Touch Start Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setTouchStartEventHandler(clbk: TouchEventHandler<this>): this;
    /**
     * Set handler for Touch Move Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setTouchMoveEventHandler(clbk: TouchEventHandler<this>): this;
    /**
     * Set handler for Touch End Event
     * @param clbk Event listener
     * @return     Entity itself for fluent interface
     */
    setTouchEndEventHandler(clbk: TouchEventHandler<this>): this;
}
/**
 * Collection of Entities with shared zIndex and Clipping configuration
 * @hidden Internal class
 */
export declare abstract class Layer<S extends Engine> extends Element<S> {
    readonly _engine: S;
    private _zIndex;
    /**
     * Update all Entities of the engine
     * @return Entity itself for fluent interface
     * @param   _engine      Rendering engine
     * @param   _zIndex  Number of depth layier there the object is located
     */
    constructor(_engine: S, _zIndex: number);
}
/**
 * Canvas implementation of Text object in 2D space
 * Internal class
 */
export declare class GlText extends Text<GlEngine> {
    /**
     * @param engine  Rendering engine
     * @param scale   Scale of the Shape's space
     * @param remove  Injected method to remove the shape from layer.
     * @param restore Injected method to restore the removed shape to layer.
     */
    constructor(engine: GlEngine, scale: Vec2<Scale>, remove: RemoveHandler<GlText>, restore: RestoreHandler<GlText>);
}
/**
 * Collection of Entities with shared zIndex and Clipping configuration for GlEngine
 * Internal class
 */
export declare class GlLayerXY extends Layer<GlEngine> implements XY<GlEngine> {
    readonly gl: GlUtils;
    /**
     * @param engine Rendering engine. NOTE: Layer must NOT cache the actual engine!
     * @param zIndex Depth index of the layer
     */
    constructor(engine: GlEngine, zIndex: number);
}
export declare class GlEngine extends Engine {
    /**
     * @param options               EngineOptions
     * @param GlUtilsConstructor    Injection of GlUtils constructor
     */
    constructor(options?: EngineOptions, GlUtilsConstructor?: typeof GlUtils);
}
/**
 * High level api for WebGL handling
 * @hidden Internal class
 */
export declare class GlUtils {
    readonly gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext, enableAlpaBlending?: boolean);
}
export declare type WebGLDrawMode = number;
export declare class Uniforms {
}
/**
 * Vertex Shader type enumerator
 */
export declare enum VertexShaderType {
    Basic,
    PointSize,
    Texture,
    PointSizePointColor,
    PointColor
}
/**
 * Fragment Shader type enumerator
 */
export declare enum FragmentShaderType {
    Basic,
    Texture,
    PointColor
}
/**
 * Abstract class for WebGL Shader
 * @property   shaderType  Shader type enum value
 * @property   shader      WebGL shader
 * @property   gl          WebGL contex
 * Internal class
 */
declare abstract class ShaderStage {
    readonly shaderType: VertexShaderType | FragmentShaderType;
    readonly shader: WebGLShader | null;
    readonly gl: WebGLRenderingContext;
    /**
     * @param source        Shader source code
     * @param shaderType    Shader type enum value
     * @param shader        WebGL shader
     * @param gl            WebGL context
     */
    constructor(source: string | undefined, shaderType: VertexShaderType | FragmentShaderType, shader: WebGLShader | null, gl: WebGLRenderingContext);
}
/**
 * WebGL Vertex Shader
 * Internal class
 */
declare class VertexShader extends ShaderStage {
    /**
     * @param shaderType    Shader type enum value
     * @param gl            WebGL context
     */
    constructor(shaderType: VertexShaderType, gl: WebGLRenderingContext);
}
/**
 * WebGL Fragment Shader
 * Internal class
 */
declare class FragmentShader extends ShaderStage {
    /**
     * @param shaderType    Shader type enum value
     * @param gl            WebGL context
     */
    constructor(shaderType: FragmentShaderType, gl: WebGLRenderingContext);
}
/**
 * Shader Program representation
 * @property    vertex      WebGL Vertex Shader
 * @property    fragment    WebGL Fragment Shader
 * @property    gl          WebGL context
 * @property    shader      WebGL Shader Program
 * Internal class
 */
export declare class Shader {
    readonly vertex: VertexShader;
    readonly fragment: FragmentShader;
    readonly gl: WebGLRenderingContext;
    readonly shader: WebGLProgram | null;
    /**
     * @param vertex    WebGL Vertex Shader
     * @param fragment  WebGL Fragment Shader
     * @param gl        WebGL context
     * @param shader    WebGL Shader Program
     */
    constructor(vertex: VertexShader, fragment: FragmentShader, gl: WebGLRenderingContext, shader?: WebGLProgram | null);
}
/**
 * Create Shader Factory
 * @param   gl  WebGL Context
 */
export declare const Shaders: (gl: WebGLRenderingContext) => (vertType: VertexShaderType, fragType: FragmentShaderType) => Shader;
export {};
/**
 * File contains utilities for implementation of touch event interactions.
 */
export {};
/**
 * XY API for Engine
 */
export declare type LayerXY<S extends Engine = Engine> = Layer<S> & XY<S>;
/**
 * TODO
 */
export interface XY<T extends Engine> {
}
/**
 * TODO
 */
export interface ShapeSet {
}
/**
 * Interface for Shape with a multiple points located in certain boundaries
 */
export interface Region {
}
/**
 * Any kind of 2D objects
 * @property    engine  Rendering Engine for XY
 * @property    scale   X and Y Scale of the Shape's space
 * Internal class
 */
export declare abstract class Shape<T extends Engine = Engine> extends Entity<T> {
    readonly _engine: T;
    protected readonly _scale: Vec2<Scale>;
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(_engine: T, _scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/**
 * Abstract class for all types of shapes, which intends to have different fill style property.
 * @property    fillStyle       Fill style object, stored inside validatable container and defines how the 2D premitive is drawn.
 * Internal class
 */
export declare abstract class FilledShape<T extends Engine = Engine> extends Shape<T> {
    readonly _engine: T;
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(_engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/**
 * Abstract class for all types of shapes, which intends to have different line style property. Requires extra drawcalls for border.
 * @property    lineStyle     Line style object, stored inside validatable container and
 *                            defines how the Border of 2D premitive is drawn.
 * Internal class
 */
export declare abstract class StyledShape<T extends Engine = Engine> extends FilledShape<T> {
    readonly _engine: T;
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(_engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/****************** Sizable Shapes ******************/
/**
 * Abstract class for all types of shapes, which have size property
 * @property    size   Size of the shape stored inside validatable container as a number to keep track of changes
 * Internal class
 */
export declare abstract class SizableShape<T extends Engine> extends FilledShape<T> {
    readonly size: Val<number>;
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     * @param   size     Size of Shape, stored inside validatable container as a number to keep track of changes
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>, size?: Val<number>);
}
/**
 * Text object in 2D space
 * @property    text        Text is a string which is stored as validatable container to keep track of its changes
 * @property    position    Position of the text in world coordinates stored as validatable container to keep track of changes
 * @property    font        Font of the text is stored as validatable container to keep track of changes
 * Internal class
 */
export declare abstract class Text<T extends Engine = Engine> extends FilledShape<T> {
    readonly font: ValConstructor<any>;
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the shape from layer.
     * @param   font     Font of the text
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>, font?: ValConstructor<any>);
}
/**
 * Abstract class for a mutable set of points
 * @property    shape       The shape of points to draw ("Square", "Circle", "Triangle")
 * Internal class
 */
export declare abstract class PointSet<T extends Engine = Engine> extends SizableShape<T> implements Region, ShapeSet {
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     * @param   size     Optional parameter to set the size of each point
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>, size?: number);
}
/**
 * Abstract class is used to create a rectangle and variations of a rectangle shape
 * @property    position   The coordinates of Top-Left corner.
 * @property    size       X - the width of the rectangle, Y - the height of the rectangle.
 * @property    rotation   Rectangle rotation in degree
 * @property    origin     Rotation origin
 * Internal class
 */
export declare abstract class Rect<T extends Engine = Engine> extends StyledShape<T> {
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/**
 * Abstract Polygon class.
 * Internal class
 */
export declare abstract class Polygon<T extends Engine = Engine> extends StyledShape<T> {
}
/**
 * Abstract class is used to create a convex polygon
 * Internal class
 */
export declare abstract class ConvexPolygon<T extends Engine> extends Polygon<T> {
}
/**
 * Abstract class is used to create a simple polygon (never intersect itself)
 * Internal class
 */
export declare abstract class SimplePolygon<T extends Engine> extends Polygon<T> {
}
/**
 * Abstract class is used to create a complex polygon
 * Internal class
 */
export declare abstract class ComplexPolygon<T extends Engine> extends Polygon<T> {
}
/**
 * Abstract class for a mutable Junction.
 * Internal class
 */
export declare abstract class Junction<T extends Engine = Engine> extends FilledShape<T> implements Region, ShapeSet {
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/**
 * Abstract class is used to create an arc.
 * @property position       The middle point of the circle containing the arc
 * @property begin          Beginning angle of the arc (0 - 360 degrees)
 * @property end            Ending angle of the arc (0 - 360 degrees)
 * @property outerRadius    Radius of the arc's outer side in pixels
 * @property innerRadius    Radius of the arc's inner side in pixels
 * Internal class
 */
export declare abstract class Arc<T extends Engine = Engine> extends StyledShape<T> {
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/**
 * Enum defines type of Polygon at factory
 */
export declare enum PolygonType {
    Complex = 0,
    Simple = 1,
    Convex = 2
}
/**
 * Abstract class for all types of lines
 * @property    thickness   Thickness of the line stored inside validatable container as a number to keep track of changes
 * Internal class
 */
export declare abstract class LineLike<T extends Engine> extends Shape<T> {
    readonly engine: T;
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/**
 * Abstract class for a single line
 * Internal class
 */
export declare abstract class Line<T extends Engine = Engine> extends LineLike<T> {
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
}
/**
 * Abstract class for a mutable set of lines
 * Internal class
 */
export declare abstract class LineSet<T extends Engine = Engine> extends LineLike<T> implements Region, ShapeSet {
    /**
     * @param   engine   Rendering engine
     * @param   scale    Scale of the Shape's space
     * @param   _remove  Injected method to remove the shape from layer.
     * @param   _restore Injected method to restore the removed shape to layer.
     */
    constructor(engine: T, scale: Vec2<Scale>, _remove: RemoveHandler<Entity>, _restore: RestoreHandler<Entity>);
    /**
     * @return  Point bounds of the data set
     */
    abstract getPointsBounds(): Interval<Point>;
}
/**
 * Function type for column packager
 * @param vertices         Array of vertices
 * @param pixelSize        Pixel size
 * @param thickness        Line thickness
 * @return                 Packed array
 */
export declare type ColumnPackager = (vertices: Point[], pixelSize: Point, thickness: number) => Point[];
/**
 * Class keep track of private state's validation status by invalid flag.
 */
export declare class Validator {
}
/**
 * Generic container keeps track of private state's validation status by invalid flag.
 * Enclosed object is only accesable via getter and setter
 * @property    value   internal state
 */
export declare class ValConstructor<T> extends Validator {
    private _value;
    /**
     * @param _value     Value which has to be placed at the container
     * @param isInvalid State of value
     */
    constructor(_value: T, isInvalid: boolean);
}
/**
 * Class that is a container for some value that can have both normal & highlighted values.
 * Handles automatic computation of default highlight value when needed.
 */
export declare class HighlightableValue<T extends {
    /**
     * Creates default highlight style based on object itself
     */
    getDefaultHighlightStyle(): T;
}> {
    /**
     * @param   initNormal      Initial value for normal state
     * @param   initHighlighted Initial value for highlighted state
     */
    constructor(initNormal: T, initHighlighted?: T);
}
/**
 * @hidden
 * Internal class
 */
export declare class PanelError extends Error {
    constructor(m: string, owner?: any);
}
/**
 * @hidden
 * Internal class
 */
export declare class AxisError extends Error {
    constructor(m: string, owner?: any);
}
/**
 * @hidden
 * Internal class
 */
export declare class EngineError extends Error {
    constructor(m: string, owner?: any, riseAlert?: boolean);
}
/**
 * @hidden
 * Internal class
 */
export declare class ShaderError extends EngineError {
    constructor(m: string);
}
/**
 * @hidden
 * Internal class
 */
export declare class UnImplementedError extends Error {
    constructor(name: string);
}
/**
 * move to common/interaces.
 * use for Point
 */
export interface Vec2<T> {
    readonly x: T;
    readonly y: T;
}
/**
 * internal/interfaces
 */
export interface MVec2<T> {
    x: T;
    y: T;
}
/**
 * internal/interfaces
 */
export declare type MPoint = MVec2<number>;
/**
 * Factory for Points. Should be used whenever creating immutable Vec2<numbers>.
 *
 * Not currently exported to users, since it doesn't give any benefit - might be very nice after we add recycling logic, which is
 * designed to be added HERE.
 * @param   x   X value
 * @param   y   Y value
 * @return      Immutable Point datastructure
 */
export declare const point: (x: number, y: number) => Point;
/**
 * Factory for Immutable Points. This is used in a few places around the library,
 * but not very much. It is premature optimization, and would ideally not exist at this point in time.
 *
 * @param   x   X value
 * @param   y   Y value
 * @return      Mutable Vec2<number> datastructure
 */
export declare const mPoint: (x: number, y: number) => MVec2<number>;
/**
 * Factory for Colored Points.
 *
 * Not currently exported to users, but might be in future.
 * @param   x       X value
 * @param   y       Y value
 * @param   color   Color value
 * @return          Immutable ColorPoint datastructure
 */
export declare const colorPoint: (x: number, y: number, color: Color) => ColorPoint;
/**
 * Factory for Area Points.
 *
 * Not currently exported to users, but might be in future.
 * @param   position    Position value
 * @param   high        High value
 * @param   low         Low value
 * @return              Immutable AreaPoint datastructure
 */
export declare const areaPoint: (position: number, high: number, low: number) => AreaPoint;
/**
 * Convert array points for Junction into an object with two arrays of Vec2 for High and Low points respectively.
 * @param areaPoints   Array of area points with X-coordinate and double Y-coordinates.
 */
export declare const areaPoint2PointArrays: (areaPoints: AreaPoint[]) => [Point[], Point[]];
/**
 * Factory for Interval
 * @param   min     Start of interval
 * @param   max     End of interval
 * @return          Immutable Interval datastructure
 */
export declare const interval: <T>(min: T, max: T) => Interval<T>;
/**
 * Factory for rectangular area in cartesian coordinates
 * @param x      X position of the area
 * @param y      Y position of the area
 * @param width  Width of the area
 * @param height Height of the area
 */
export declare const area: (x: number, y: number, width: number, height: number) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Factory for Val
 * @param    value      Internal state
 * @param    isInvalud  Validness state
 */
export declare const val: <T>(value: T, isInvalid?: boolean) => ValConstructor<T>;
/**
 * Factory for creating mutable margin-datastructures.
 * @param   left    Left margin in pixels. Defaults to 0
 * @param   top     Top margin in pixels. Defaults to 0
 * @param   right   Right margin in pixels. Defaults to 0
 * @param   bottom  Bottom margin in pixels. Defaults to 0
 * @return          Mutable margin-datastructure
 */
export declare const mmargin: (left?: number, top?: number, right?: number, bottom?: number) => MMargin;
/**
 * Factory for creating Margin data-structures, which combine four numeric values by sides:
 * - left
 * - top
 * - right
 * - bottom
 *
 * Functionally equal to padding.
 * @param   left    Left margin in pixels or 0 if omitted/undefined.
 * @param   top     Top margin in pixels or 0 if omitted/undefined.
 * @param   right   Right margin in pixels or 0 if omitted/undefined.
 * @param   bottom  Bottom margin in pixels or 0 if omitted/undefined.
 * @return          Margin
 */
export declare const margin: (left?: number, top?: number, right?: number, bottom?: number) => Margin;
/**
 * Factory for creating Padding data-structures, which combine four numeric values by sides:
 * - left
 * - top
 * - right
 * - bottom
 *
 * Functionally equal to margin.
 * @param   left    Left margin in pixels or 0 if omitted/undefined.
 * @param   top     Top margin in pixels or 0 if omitted/undefined.
 * @param   right   Right margin in pixels or 0 if omitted/undefined.
 * @param   bottom  Bottom margin in pixels or 0 if omitted/undefined.
 * @return          Padding
 */
export declare const padding: (left?: number | undefined, top?: number | undefined, right?: number | undefined, bottom?: number | undefined) => Margin;
/**
 * Utility function for creating a new Margin based on two others.
 * Override a Margin datastructure with another.
 *
 * Functionally equal to overridePadding.
 * @param   previous    Existing Margin object
 * @param   override    Partial Margin object containing all properties/values to be overridden
 * @return              New Margin object that is same as 'previous', but with values overridden by those of 'override'
 */
export declare const overrideMargin: (previous: Margin, override: Partial<Margin>) => Margin;
/**
 * Utility function for creating a new Margin based on two others.
 * Override a Margin datastructure with another.
 *
 * Functionally equal to overrideMargin.
 * @param   previous    Existing Padding object
 * @param   override    Partial Padding object containing all properties/values to be overridden
 * @return              New Padding object that is same as 'previous', but with values overridden by those of 'override'
 */
export declare const overridePadding: (previous: Margin, override: Partial<Margin>) => Margin;
/**
 * Generic Interval
 * @property    min   Start of interval
 * @property    max   End of interval
 */
export interface Interval<T> {
    readonly min: T;
    readonly max: T;
}
/**
 * Generic mutable Interval
 * @property    min   Start of interval
 * @property    max   End of interval
 */
export interface MInterval<T> {
    min: T;
    max: T;
}
/**
 * Rectangular area in cartesian coordinates
 * @property x      X position of the area
 * @property y      Y position of the area
 * @property width  Width of the area
 * @property height Height of the area
 */
export interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Generic container keeps track of private state's validation status by invalid flag.
 * Enclosed object is only accesable via getter and setter
 * @property    value   internal state
 */
export declare type Val<T> = ValConstructor<T>;
/**
 * Interface for a mutable margin-datastructure.
 */
export interface MMargin {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
/**
 * Interface defines methods for invalidation and validation of private state
 */
export interface Validatable {
}
export {};
/**
 * Container class for a value that can be observed.
 * (event which is triggered when value is set)
 * Internal class
 */
export declare class ObservableValue<T> {
    private _value;
    /**
     * @param   _value   Initial value
     */
    constructor(_value: T);
}
/**
 * Decorator for a remove handler function.
 * Calling this indicates that reference to passed object should be removed.
 */
export declare type RemoveHandler<T> = (obj: T) => void;
/**
 * Decorator for a restore handler function.
 * Calling this indicates that reference to passed object should be restored.
 */
export declare type RestoreHandler<T> = (obj: T) => void;
export declare type BoundaryCorner<T> = (boundary: Interval<Vec2<T>>) => T;
/**
 * File contains internal default style factories for all of library.
 * These are also intended to be public so user can easily replicate them and perhaps mutate them somehow in the future.
 */
/**
 * Collection of some useful cursor styles.
 *
 * Uses HTML DOM Style cursor property, so supported values are specified by browser.
 *
 * https://www.w3schools.com/jsref/prop_style_cursor.asp
 *
 * Use with *UIElement*.**setMouseStyle()**
 */
export declare enum MouseStyles {
    Move = "move",
    ResizeColumn = "col-resize",
    ResizeRow = "row-resize",
    Horizontal = "e-resize",
    Vertical = "n-resize",
    NorthWest = "nw-resize",
    NorthEast = "ne-resize",
    Copy = "copy",
    CrossHair = "crosshair",
    Default = "default",
    Help = "help",
    Restricted = "not-allowed",
    None = "none",
    Point = "pointer",
    Text = "text",
    Wait = "wait",
    ZoomIn = "zoom-in",
    ZoomOut = "zoom-out"
}
/**
 * Collection of fast-access *arguments* for ***UIElement*.setOrigin()**
 */
export declare const UIOrigins: {
    LeftBottom: Point;
    CenterBottom: Point;
    RightBottom: Point;
    LeftCenter: Point;
    Center: Point;
    RightCenter: Point;
    LeftTop: Point;
    CenterTop: Point;
    RightTop: Point;
};
/**
 * A *SolidFill* singleton for a completely transparent fill.
 * Can be useful in at least following cases:
 *
 * 1) User wants to hide something but still have it interactable by mouse/touch
 *
 * 2) User wants to hide something that does not support *emptyFill*
 *
 * Otherwise, *emptyFill* should be preferred for better performance.
 */
export declare const transparentFill: SolidFill;
/**
 * A *SolidLine* singleton for a completely transparent line.
 * Can be useful in at least following cases:
 *
 * 1) User wants to hide something but still have it interactable by mouse/touch
 *
 * 2) User wants to hide something that does not support *emptyFill*
 *
 * Otherwise, *emptyLine* should be preferred for better performance.
 */
export declare const transparentLine: SolidLine;
/**
 * Interface which supplies library components with their default styles.
 * @hidden
 */
export interface LibraryStyle {
    /**
     * Default fill style for Dashboard background
     */
    readonly dashboardBackgroundFillStyle: SolidFill;
    /**
     * Default stroke style for Dashboard background.
     */
    readonly dashboardBackgroundStrokeStyle: LineStyle;
    /**
     * Default fill style for Dashboard splitter lines
     */
    readonly dashboardSplitterStyle: SolidLine;
    /**
     * Default fill style for highlighted Dashboard splitter lines
     */
    readonly dashboardSplitterStyleHighlight: SolidLine;
    /**
     * Default fill style for Panel background
     */
    readonly panelBackgroundFillStyle: SolidFill;
    /**
     * Default stroke style for Panel background.
     */
    readonly panelBackgroundStrokeStyle: LineStyle;
    /**
     * Default fill style for chart background fill.
     */
    readonly chartBackgroundFillStyle: SolidFill;
    /**
     * Default stroke style for chart background stroke.
     */
    readonly chartBackgroundStrokeStyle: LineStyle;
    /**
     * Default FontSettings for Spider Chart title.
     */
    readonly spiderChartTitleFont: FontSettings;
    /**
     * Fill style using a opaque white color.
     */
    readonly spiderSeriesFillStyle: SolidFill;
    /**
     * Default web line style for Spider Chart.
     */
    readonly spiderWebStyle: SolidLine;
    /**
     * Default axis line style for Spider Chart.
     */
    readonly spiderAxisStyle: SolidLine;
    /**
     * Default series fill style for Spider Chart.
     */
    readonly spiderSeriesStrokeStyle: SolidLine;
    /**
     * Default FillStyle for Spider scale labels.
     */
    readonly spiderScaleLabelFillStyle: SolidFill;
    /**
     * Default FontSettings for Spider scale labels.
     */
    readonly spiderScaleLabelFont: FontSettings;
    /**
     * Default FillStyle for Spider axis labels.
     */
    readonly spiderAxisLabelFillStyle: SolidFill;
    /**
     * Default FontSettings for Spider axis labels.
     */
    readonly spiderAxisLabelFont: FontSettings;
    /**
     * Default FontSettings for Pie Chart title.
     */
    readonly pieChartTitleFont: FontSettings;
    /**
     * Default FillStyle Palette for Pie Slices.
     */
    readonly pieSliceFillStylePalette: Palette<FillStyle>;
    /**
     * Default LineStyle for Pie Slices stroke.
     */
    readonly pieSliceStrokeStyle: LineStyle;
    /**
     * Default fillStyle for Pie Labels.
     */
    readonly pieLabelFillStyle: SolidFill;
    /**
     * Default FontSettings for Pie Labels.
     */
    readonly pieLabelFont: FontSettings;
    /**
     * Default LineStyle for Pie Label connectors.
     */
    readonly pieLabelConnectorStyle: SolidLine;
    /**
     * Default FontSettings for Funnel Chart title.
     */
    readonly funnelChartTitleFont: FontSettings;
    /**
     * Default FillStyle Palette for Funnel Slices.
     */
    readonly funnelSliceFillStylePalette: Palette<FillStyle>;
    /**
     * Default LineStyle for Funnel Slices Stroke.
     */
    readonly funnelSliceStrokeStyle: LineStyle;
    /**
     * Default fillStyle for Funnel Labels.
     */
    readonly funnelLabelFillStyle: SolidFill;
    /**
     * Default FontSettings for Funnel Labels.
     */
    readonly funnelLabelFont: FontSettings;
    /**
     * Default LineStyle for Funnel Label connectors.
     */
    readonly funnelLabelConnectorStyle: SolidLine;
    /**
     * Default FontSettings for Pyramid Chart title.
     */
    readonly pyramidChartTitleFont: FontSettings;
    /**
     * Default FillStyle Palette for Pyramid Slices.
     */
    readonly pyramidSliceFillStylePalette: Palette<FillStyle>;
    /**
     * Default LineStyle for Pyramid Slices Stroke.
     */
    readonly pyramidSliceStrokeStyle: LineStyle;
    /**
     * Default fillStyle for Pyramid Labels.
     */
    readonly pyramidLabelFillStyle: SolidFill;
    /**
     * Default FontSettings for Pyramid Labels.
     */
    readonly pyramidLabelFont: FontSettings;
    /**
     * Default LineStyle for Pyramid Label connectors.
     */
    readonly pyramidLabelConnectorStyle: SolidLine;
    /**
     * Get default font for chart XY title
     */
    readonly chartXYTitleFont: FontSettings;
    /**
     * Default fill style for chart XY zooming rectangle
     */
    readonly chartXYZoomingRectangleFillStyle: FillStyle;
    /**
     * Default fill style for chart XY zooming rectangle stroke
     */
    readonly chartXYZoomingRectangleStrokeStyle: SolidLine;
    /**
     * Default fill style for chart XY fitting rectangle
     */
    readonly chartXYFittingRectangleFillStyle: FillStyle;
    /**
     * Default fill style for chart XY fitting rectangle stroke
     */
    readonly chartXYFittingRectangleStrokeStyle: SolidLine;
    /**
     * Default fill style for axis title
     */
    readonly axisTitleFillStyle: SolidFill;
    /**
     * Default font for axis title
     */
    readonly axisTitleFont: FontSettings;
    /**
     * Default fill style for axis labels
     */
    readonly axisLabelFillStyle: SolidFill;
    /**
     * Default font for axis title
     */
    readonly axisLabelFont: FontSettings;
    /**
     * Default fill style for axes
     */
    readonly axisStyle: SolidLine;
    /**
     * Default fill style for highlighted axes (mouse-picking area)
     */
    readonly axisOverlayStyle: SolidFill;
    /**
     * Default style for axis ticks
     */
    readonly axisTickStyle: SolidLine;
    /**
     * Default line style for axis nibs
     */
    readonly axisNibStyle: SolidLine;
    /**
     * Default fill style for highlighted axis nibs (mouse-picking area)
     */
    readonly axisNibOverlayStyle: SolidFill;
    /**
     * Default style for axis grid lines
     */
    readonly axisGridStrokeStyle: SolidLine;
    /**
     * Default style for custom tick grid stroke.
     */
    readonly customTickGridStrokeStyle: SolidLine;
    /**
     * Default fill style for Series
     */
    readonly seriesStyle: SolidFill;
    /**
     * Default line series line style
     */
    readonly defaultLineSeriesStyle: SolidLine;
    /**
     * Default fill style for point line series points
     */
    readonly pointLinePointFillStyle: SolidFill;
    /**
     * Default style for strokes of mountain-series (Area AreaRange).
     */
    readonly defaultMountainsStrokeStyle: SolidLine;
    /**
     * Default style for filling of mountain-series (Area AreaRange).
     */
    readonly defaultMountainsFillStyle: SolidFill;
    /**
     * Default style for inverted strokes of mountain-series (Area AreaRange).
     */
    readonly defaultMountainsInvertedStrokeStyle: SolidLine;
    /**
     * Default style for inverted filling of mountain-series (Area AreaRange).
     */
    readonly defaultMountainsInvertedFillStyle: SolidFill;
    /**
     * Default line style for segment series
     */
    readonly segmentSeriesStyle: SolidLine;
    /**
     * Default line style for OHLC candle sticks
     */
    readonly defaultCandleStickStyle: SolidLine;
    /**
     * Default line style for positive OHLC Bars
     */
    readonly defaultOHLCBarPositiveStyle: SolidLine;
    /**
     * Default line style for negative OHLC Bars
     */
    readonly defaultOHLCBarNegativeStyle: SolidLine;
    /**
     * Default positive fill style for OHLC candle sticks
     */
    readonly defaultCandleStickPositiveStyle: SolidFill;
    /**
     * Default negative fill style for OHLC candle sticks
     */
    readonly defaultCandleStickNegativeStyle: SolidFill;
    /**
     * Default fill style for Box Figures
     */
    readonly defaultBoxFigureStyle: SolidFill;
    /**
     * Default line style for Box Figures stroke
     */
    readonly defaultBoxFigureStrokeStyle: SolidLine;
    /**
     * Default line style for Box Figures Line
     */
    readonly defaultBoxFigureLineStyle: SolidLine;
    /**
     * Default line style for Box Figures Median Line
     */
    readonly defaultBoxFigureMedianLineStyle: SolidLine;
    /**
     * Default fill style for Cursor PointMarker
     */
    readonly pointMarkerFillStyle: SolidFill;
    /**
     * Default line style for Cursor PointMarker
     */
    readonly pointMarkerStrokeStyle: LineStyle;
    /**
     * Default fill style for Cursor ResultTable
     */
    readonly resultTableFillStyle: SolidFill;
    /**
     * Default line style for Cursor ResultTable
     */
    readonly resultTableStrokeStyle: SolidLine;
    /**
     * Default fill style for Cursor ResultTable text
     */
    readonly resultTableTextStyle: SolidFill;
    /**
     * Default fill style for UI Element Background
     */
    readonly uiBackgroundFillStyle: FillStyle;
    /**
     * Default stroke style for UI Element Background
     */
    readonly uiBackgroundStrokeStyle: LineStyle;
    /**
     * Default fill style for UI Text
     */
    readonly uiTextFillStyle: SolidFill;
    /**
     * Default fill style for UI Button
     */
    readonly uiButtonFillStyle: SolidFill;
    /**
     * Default size for UI Button
     */
    readonly uiButtonSize: number;
    /**
     * Function that styles a 'Button' given a single FillStyle (default design for Buttons).
     */
    readonly styleButton: (button: StylableButton, fillStyle: FillStyle) => void;
}
/**
 * Collection of default styles used for the whole library.
 *
 * Can be referenced in applications for mimicking style, or just fast access to some styles.
 */
export declare const DefaultLibraryStyle: LibraryStyle;
/**
 * PUBLIC !
 * File contains interfaces and enums used in UI system.
 */
/**
 * Enum that is used to specify a relative area inside an UI element.
 *
 * Probably not needed in user applications.
 */
export declare enum UISpace {
    /**
     * Smallest area, equal to the UiElements respective visual content
     */
    Content = 0,
    /**
     * Content + Padding, area that should be contained within Backgrounds border
     */
    PaddedContent = 1,
    /**
     * Content + Padding + Background padding
     */
    PaddedBackground = 2,
    /**
     * Content + Padding + Background padding + Margin
     */
    Everything = 3
}
/**
 * Enum for selecting visibility of parts of *Marker*s. Each part can be configured individually:
 *
 * | Desired result         | Usage                                                                                     |
 * | :--------------------- | :---------------------------------------------------------------------------------------- |
 * | Hide part              | *SeriesMarkerXY*.setTickMarkerYVisibility( *UIVisibilityModes.never* )                    |
 * | Show part when pointed | *ChartMarkerXY*.setResultTableVisibility( *UIVisibilityModes.whenHovered* )               |
 *
 */
export declare enum UIVisibilityModes {
    /**
     * Part is never visible
     */
    never = 0,
    /**
     * Part is always visible
     */
    always = 1,
    /**
     * Part is visible when Marker is hovered with mouse and not being dragged
     */
    whenHovered = 2,
    /**
     * Part is visible when Marker is being dragged with mouse
     */
    whenDragged = 3,
    /**
     * Part is visible when Marker is not being dragged with mouse
     */
    whenNotDragged = 4,
    /**
     * Part is visible when Marker is hovered with mouse or dragged
     */
    whenHoveredOrDragged = 5
}
/**
 * Enum for selecting behaviour of dragging interactions of *UIElements*. Dragging can be done by both mouse and touch.
 *
 * Use with *UIElement*.**setDraggingMode()**
 */
export declare enum UIDraggingModes {
    /**
     * *UIElement* is not draggable.
     */
    notDraggable = 0,
    /**
     * *UIElement* is draggable.
     */
    draggable = 1,
    /**
     * *UIElement* is only draggable on horizontal plane.
     */
    onlyHorizontal = 2,
    /**
     * *UIElement* is only draggable on vertical plane.
     */
    onlyVertical = 3
}
/**
 * Interface for object that can be dragged by mouse.
 * @hidden
 */
export interface Draggable {
    /**
     * Set dragging mode of object. Defines how the object can be dragged by mouse.
     *
     * See **UIDraggingModes**-collection for options.
     * @param       draggingMode    DraggingMode or undefined to disable dragging
     * @returns                     Object itself
     */
    setDraggingMode(draggingMode?: UIDraggingModes): this;
    /**
     * Get dragging mode of object.
     * Defines how the object can be dragged by mouse.
     * @returns                     Object itself
     */
    getDraggingMode(): UIDraggingModes;
}
/**
 * Enum for specifying a direction. Used for styling *Pointable* *UIElements*.
 */
export declare enum UIDirections {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3
}
/**
 * Element that can be pointed at a direction (left,right,up or down)
 * @hidden
 */
export interface Pointable {
    /**
     * Set direction.
     * @param   direction   Enum Direction
     * @returns             Object itself for fluent interface
     */
    setDirection(direction: UIDirections): this;
    /**
     * Get direction.
     * @returns             Enum Direction
     */
    getDirection(): UIDirections;
    /**
     * Set length of Pointable head in pixels.
     * @param   length  Length of head in pixels.
     * @returns         Object itself for fluent interface
     */
    setPointerLength(length: pixel): this;
    /**
     * Get length of Pointable head in pixels.
     * @returns             Pixel length
     */
    getPointerLength(): pixel;
    /**
     * Set angle of Pointable in degrees. [0-90]
     * @param   angle   Angle of pointer or undefined to match head & body size
     * @returns         Object itself for fluent interface
     */
    setPointerAngle(angle?: number): this;
    /**
     * Get angle of Pointable in degrees.
     * @returns         Angle in degrees
     */
    getPointerAngle(): pixel;
}
/**
 * Interface for object that can be rendered as part of UI.
 * @hidden
 */
export interface Plotable {
}
/**
 * Event handler for mouse move
 * @param   obj             Object
 * @param   event           Browser MouseEvent that triggered the event
 */
export declare type MouseEventHandler<T> = (obj: T, event: MouseEvent) => void;
/**
 * Event handler for mouse event that is 'abrupt'.
 * Meaning that the event can be triggered as a side-effect of something totally unrelated, without an actual mouse-event.
 * ( Designed for making sure that mouse-leave is handled when hovered entity is disposed )
 * @param   obj             Object
 * @param   event           Browser MouseEvent that triggered the event of undefined if event is abrupt
 */
export declare type AbruptMouseEventHandler<T> = (obj: T, event?: MouseEvent) => void;
/**
 * Event handler for mouse drag start
 * @param   obj             Object
 * @param   event           Browser MouseEvent that triggered the event
 * @param   button          Button that is being held down
 */
export declare type MouseDragStartEventHandler<T> = (obj: T, event: MouseEvent, button: number) => void;
/**
 * Event handler for mouse drag
 * @param   obj             Object
 * @param   event           Browser MouseEvent that triggered the event
 * @param   button          Button that is being held down
 * @param   startLocation   Start location of mouse
 * @param   delta           Dragged delta
 */
export declare type MouseDragEventHandler<T> = (obj: T, event: MouseEvent, button: number, startLocation: Point, delta: Point) => void;
/**
 * Event handler for mouse drag
 * @param   obj             Object
 * @param   event           Browser MouseEvent that triggered the event
 * @param   button          Button that is being held down
 * @param   startLocation   Start location of mouse
 */
export declare type MouseDragStopEventHandler<T> = (obj: T, event: MouseEvent, button: number, startLocation: Point) => void;
/**
 * Event handler for mouse wheel
 * @param   obj             Object
 * @param   event           Browser WheelEvent that triggered the event
 */
export declare type MouseWheelEventHandler<T> = (obj: T, event: WheelEvent) => void;
/**
 * Event handler for touch event
 * @param   obj             Object
 * @param   event           Browser TouchEvent that triggered the event
 */
export declare type TouchEventHandler<T> = (obj: T, event: TouchEvent) => void;
/**
 * Interface for object that can have mouse-event-subscriptions.
 * @hidden
 */
export interface Interactable {
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return      Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
    /**
     * Subscribe on Mouse Enter event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseEnter(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe on Mouse Enter leave
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseLeave(listener: AbruptMouseEventHandler<this>): Token;
    /**
     * Subscribe on Mouse Enter click
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseClick(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Double Click event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseDoubleClick(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Down event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseDown(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Up event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseUp(listener: MouseEventHandler<this>): Token;
    /**
    * Subscribe to Mouse Move event
    * @param   listener    Event handler function
    * @returns             Token of subscription
    */
    onMouseMove(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag Start event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseDragStart(listener: MouseDragStartEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseDrag(listener: MouseDragEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag Stop event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseDragStop(listener: MouseDragStopEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Wheel event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseWheel(listener: MouseWheelEventHandler<this>): Token;
    /**
     * Subscribe to Touch Start event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onTouchStart(listener: TouchEventHandler<this>): Token;
    /**
     * Subscribe to Touch Move event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onTouchMove(listener: TouchEventHandler<this>): Token;
    /**
     * Subscribe to Touch End event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onTouchEnd(listener: TouchEventHandler<this>): Token;
    /**
     * Remove event listener from Mouse Enter Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseEnter(token: Token): boolean;
    /**
     * Remove event listener from Mouse Leave Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseLeave(token: Token): boolean;
    /**
     * Remove event listener from Mouse Click Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseClick(token: Token): boolean;
    /**
     * Remove event listener from Mouse Double Click Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDoubleClick(token: Token): boolean;
    /**
     * Remove event listener from Mouse Down Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDown(token: Token): boolean;
    /**
     * Remove event listener from Mouse Up Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseUp(token: Token): boolean;
    /**
     * Remove event listener from Mouse Move Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseMove(token: Token): boolean;
    /**
     * Remove event listener from Mouse Drag start Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDragStart(token: Token): boolean;
    /**
     * Remove event listener from Mouse Drag Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDrag(token: Token): boolean;
    /**
     * Remove event listener from Mouse Drag stop Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDragStop(token: Token): boolean;
    /**
     * Remove event listener from Mouse Wheel Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseWheel(token: Token): boolean;
    /**
     * Remove event listener from Touch Start Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchStart(token: Token): boolean;
    /**
     * Remove event listener from Touch Move Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchMove(token: Token): boolean;
    /**
     * Remove event listener from Touch End Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchEnd(token: Token): boolean;
}
/**
 * Interface for object that can be switched on/off and that can have respective event-subscriptions
 * @hidden
 */
export interface Switchable {
    /**
     * Set state of switchable object.
     *
     * **NOTE: If *Switchable*.getLocked() == true, this method will not do anything.!**
     * @param isOn  State as boolean flag
     * @returns     Object itself for fluent interface
     */
    setOn(isOn: boolean): this;
    /**
     * @return State as boolean flag
     */
    getOn(): boolean;
    /**
     * Set whether *Switchable* is locked or not. When locked, *Switchable*.setOn() is disabled.
     * @param isLocked state
     * @returns State as boolean flag
     */
    setLocked(isLocked: boolean): this;
    /**
     * @returns State of isLocked boolean flag
     */
    getLocked(): boolean;
    /**
     * Subscribe to Switch event
     * @return      Token of subscription
     */
    onSwitch(listener: (obj: this, state: boolean) => void): Token;
    /**
     * Remove event listener from Switch event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offSwitch(token: Token): boolean;
}
/**
 * Interface for an object that can be highlighted.
 * @hidden
 */
export interface Highlightable {
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
    /**
     * @return True for highlighted state of object and false for basic
     */
    getHighlighted(): boolean;
}
/**
 * Indicates object which can have margin.
 * Margin is empty space around element content (including background if any)
 * @hidden
 */
export interface Marginable {
    /**
     * Set margin around object in pixels.
     * @param   margin      Number with pixel margins for all sides or datastructure with individual pixel margins
     *                      for each side. Any side can be omitted, only passed values will be overridden.
     * @return              Object itself
     */
    setMargin(margin: Partial<MMargin> | number): this;
    /**
     * Get margin around object in pixels.
     * @return  Margin datastructure
     */
    getMargin(): Margin;
}
/**
 * Interface for an object that has stylable background.
 * @hidden
 */
export interface StylableBackground<BackgroundType extends UIBackground = UIBackground> extends Highlightable {
    /**
     * Method for mutating Background of object.
     *
     * Type of Background is generic, see **UIBackground** for minimum interface.
     * @param   mutator Mutator function for Background
     * @return          Object itself for fluent interface
     */
    setBackground(mutator: Mutator<BackgroundType>): this;
    /**
     * Get elements Background object
     *
     * Type of Background is generic, see **UIBackground** for minimum interface.
     * @returns     Background object
     */
    getBackground(): BackgroundType;
    /**
     * Set padding around object in pixels.
     * Padding is empty space between the UiElements content and Background
     * @param   padding     Number with pixel margins for all sides or datastructure with individual pixel paddings
     *                      for each side. Any side can be omitted, only passed values will be overridden.
     * @return              Object itself
     */
    setPadding(padding: Partial<Margin> | number): this;
    /**
     * Get padding around object in pixels.
     * Padding is empty space between the UiElements content and Background
     * @return  Margin datastructure
     */
    getPadding(): Margin;
}
/**
 * Interface for object that has stylable text.
 * @hidden
 */
export interface StylableText {
    /**
     * Get the text of the entire shape.
     * @returns             The entire text string.
     */
    getText(): string;
    /**
     * Set text fill style object
     * @param value Fill style object or function which modifies it
     * @return      Object itself for fluent interface
     */
    setTextFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * @return Current text fill style object
     */
    getTextFillStyle(): FillStyle;
    /**
     * Set text fill style object when highlighted
     * @param value Fill style object or mutator to modify existing one or undefined for auto assignment
     * @return      Object itself for fluent interface
     */
    setTextFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * @return Current text fill style object when highlighted or undefined for auto assignment
     */
    getTextFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set font of Label.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Object itself
     */
    setFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Label.
     * @return          FontSettings
     */
    getFont(): FontSettings;
}
/**
 * Interface for object that has stylable and settable text.
 * @hidden
 */
export interface CustomizableText extends StylableText {
    /**
     * Specify a text string.
     * @param text          The string to be rendered.
     * @returns             Object itself for fluent interface.
     */
    setText(text: string): this;
}
/**
 * Interface for object that has configurations for style of button.
 * @hidden
 */
export interface StylableButton {
    /**
     * Set fill style of Button when state is OFF
     * @param   value   Fill style object or function which modifies it
     * @return          Object itself for fluent interface
     */
    setButtonOffFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Button when state is OFF
     * @return  Fill style object
     */
    getButtonOffFillStyle(): FillStyle;
    /**
     * Set highlighted fill style of Button when state is OFF
     * @param value     FillStyle for highlighted object or function which modifies it or undefined for auto assignment
     */
    setButtonOffFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get highlighted fill style of Button when state is OFF
     * @return  Fill style object or undefined for auto assignment
     */
    getButtonOffFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set style of Button when state is OFF
     * @param   lineStyle       Style object or function which modifies it
     * @return                  Object itself for fluent interface
     */
    setButtonOffStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of Button when state is OFF
     * @return  Line style object
     */
    getButtonOffStrokeStyle(): LineStyle;
    /**
     * Set size of Button when state is OFF
     * @param   size    Point or pixel for squared button size
     * @return          Object itself
     */
    setButtonOffSize(size: Point | pixel): this;
    /**
     * Get size of Button when state is OFF
     * @return          Size of button as Point
     */
    getButtonOffSize(): Point;
    /**
     * Set fill style of Button when state is ON
     * @param   value   Fill style object or function which modifies it
     * @return          Object itself for fluent interface
     */
    setButtonOnFillStyle(value: FillStyle | Mutator<FillStyle>): this;
    /**
     * Get fill style of Button when state is ON
     * @return  Fill style object
     */
    getButtonOnFillStyle(): FillStyle;
    /**
     * Set highlighted fill style of Button when state is ON
     * @param style     FillStyle for highlighted object or function which modifies it or undefined for auto assignment
     */
    setButtonOnFillStyleHighlight(style: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get highlighted fill style of Button when state is ON
     * @return  Fill style object or undefined for auto assignment
     */
    getButtonOnFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set style of Button when state is ON
     * @param   lineStyle       Line style object or function which modifies it
     * @return                  Object itself for fluent interface
     */
    setButtonOnStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of Button when state is ON
     * @return  Line style object
     */
    getButtonOnStrokeStyle(): LineStyle;
    /**
     * Set size of Button when state is ON
     * @param   size    Point or pixel for squared button size
     * @return          Object itself
     */
    setButtonOnSize(size: Point | pixel): this;
    /**
     * Get size of Button when state is ON
     * @return          Size of button as Point
     */
    getButtonOnSize(): Point;
}
/**
 * Contains strategies for auto-fitting of Cursors.
 */
/**
 * Type of factory for AutoFitStrategy.
 *
 * This is the type passed to Cursors to set auto-fitting strategy.
 * @param   resultTable ResultTable object to operate with
 * @param   scale       Scale that ResultTable should fit inside
 * @hidden  Excluded from API document, even though it is public API.
 *          The types involved are not required and just reveal inside information.
 */
export declare type AutoFitStrategyFactory<ResultTableBackgroundType extends UIBackground> = (resultTable: ResultTable<ResultTableBackgroundType>, scale: Vec2<Scale>) => AutoFitStrategy<ResultTableBackgroundType>;
/**
 * Strategy that tries to automatically fit the ResultTable of Cursors into an arbitrary scale somehow.
 * AutoFitStrategy keeps track of its changes to the ResultTable and as such is aware if user has modified some relevant trait of it.
 * @hidden Internal class
 */
export declare abstract class AutoFitStrategy<ResultTableBackgroundType extends UIBackground> {
    protected _resultTable: InternalResultTable<ResultTableBackgroundType>;
    protected _scale: Vec2<Scale>;
    /**
     * @param   _resultTable ResultTable object to operate with
     * @param   _scale       Scale that ResultTable should fit inside
     * @hidden
     */
    constructor(_resultTable: InternalResultTable<ResultTableBackgroundType>, _scale: Vec2<Scale>);
    /**
     * Attempt to auto-fit ResultTable to scale.
     * @returns True, when ResultTable fits the scale after auto-fit
     */
    update(): boolean;
    /**
     * Restore any changes that strategy has made to ResultTable.
     */
    resetTable(): this;
}
/**
 * Auto fitting strategy that tries to fit ResultTable by flipping its origin.
 * @hidden Internal class
 */
declare class Flip<ResultTableBackgroundType extends UIBackground> extends AutoFitStrategy<ResultTableBackgroundType> {
}
/**
 * Auto fitting strategy that tries to fit ResultTable by reducing its fontSize
 * @hidden Internal class
 */
declare class FontSize<ResultTableBackgroundType extends UIBackground> extends AutoFitStrategy<ResultTableBackgroundType> {
    protected _minimumFontSize: number;
    protected _stepCount: number;
    /**
     * @param   resultTable     ResultTable object to operate with
     * @param   scale           Scale that ResultTable should fit inside
     * @param   _minimumFontSize Minimum font size that must be retained at all times
     */
    constructor(resultTable: InternalResultTable<ResultTableBackgroundType>, scale: Vec2<Scale>, _minimumFontSize: number, _stepCount: number);
}
interface AutoFitStrategies {
    Flip: <ResultTableBackgroundType extends UIBackground>(resultTable: InternalResultTable<ResultTableBackgroundType>, scale: Vec2<Scale>) => Flip<ResultTableBackgroundType>;
    FontSize: (minimumFontSize: number, stepCount: number) => (resultTable: InternalResultTable, scale: Vec2<Scale>) => FontSize<UIBackground>;
}
/**
 * Collection of *AutoFitStrategyFactories*.
 *
 * Used with *AutoCursor*s and *Marker*s **setAutoFitStrategy()** to customize logic for keeping *ResultTable* in view.
 */
export declare const AutoFitStrategies: AutoFitStrategies;
export {};
/**
 * File contains definition of a 'Cursor' + builder for their creation
 */
/**
 * Interface that is used to point a Cursor to a specific data-point.
 */
export interface CursorPoint<T extends Series2D = Series2D> {
    /**
     * Location of point
     */
    location: Point;
    /**
     * Scale where point is located
     */
    scale: Vec2<Scale>;
    /**
     * Contents for ResultTable
     */
    resultTableContent: ResultTableContent;
    /**
     * Series that contains point
     */
    series: T;
    /**
     * Optional attached fillStyle
     */
    fillStyle?: FillStyle;
}
/**
 * Cursor is a hidable element that can be positioned on a point using a
 * data-structure called 'DataPoint'. Cursors are formed from two
 * distinct parts, PointMarker and ResultTable, first of which
 * shows the location of the Cursor clearly and the second
 * to display information about the pointed DataPoint.
 */
export interface Cursor<PointMarkerType extends PointMarker = any, ResultTableBackgroundType extends UIBackground = any> extends Plotable, Disposable, Removable {
    /**
     * Points the Cursor at a given CursorPoint.
     * Updating its position and displayed data.
     */
    pointAt: (point: CursorPoint) => this;
    /**
     * Get current position of Cursor on its scale
     * @return              Position on Cursors scale
     */
    getPosition: () => Point;
    /**
     * Dispose PointMarker
     * @return Object itself for fluent interface
     */
    restorePointMarker(): this;
    /**
     * Restore PointMarker
     * @return Object itself for fluent interface
     */
    disposePointMarker(): this;
    /**
     * @return Weather PointMarker is disposed
     */
    isDisposedPointMarker: () => boolean;
    /**
     * Mutator function for PointMarker.
     * PointMarker is a visual that is displayed at the Cursors position
     * @param   mutator     Mutator function for PointMarker
     * @return              Object itself for fluent interface
     */
    setPointMarker: (mutator: Mutator<PointMarkerType>) => this;
    /**
     * Get PointMarker object.
     * PointMarker is a visual that is displayed at the Cursors position
     * @returns             PointMarker object
     */
    getPointMarker: () => PointMarkerType;
    /**
     * Dispose ResultTable
     * @return Object itself for fluent interface
     */
    disposeResultTable: () => this;
    /**
     * Restore ResultTable
     * @return Object itself for fluent interface
     */
    restoreResultTable: () => this;
    /**
     * @return Weather ResultTable is disposed
     */
    isDisposeResultTable: () => boolean;
    /**
     * Mutator function for ResultTable.
     * ResultTable is a visual that displays currently pointed data next to its location
     * @param   mutator     Mutator function for ResultTable
     * @return              Object itself for fluent interface
     */
    setResultTable: (mutator: Mutator<ResultTable<ResultTableBackgroundType>>) => this;
    /**
     * Get ResultTable object.
     * ResultTable is a visual that displays currently pointed data next to its location
     * @returns             ResultTable object
     */
    getResultTable: () => ResultTable<ResultTableBackgroundType>;
    /**
     * Set AutoFitStrategy of Cursor. Customizable logic which attempts to fit ResultTable to view.
     *
     * **See AutoFitStrategies for available options**.
     * @param   autoFitStrategy     AutoFitStrategy or undefined to disable auto-fitting
     * @returns                     Object itself for fluent interface
     */
    setAutoFitStrategy(autoFitStrategy?: AutoFitStrategyFactory<ResultTableBackgroundType>): this;
    /**
     * Get is AutoFitStrategy enabled. Customizable logic which attempts to fit ResultTable to view.
     * @returns                     Boolean flag whether auto-fit is enabled
     */
    getAutoFitStrategy(): boolean;
}
/**
 * Internal type for cursor
 * @hidden
 */
export declare type InternalCursor<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground> = Cursor<PointMarkerType, ResultTableBackgroundType>;
/**
 * DynamicCursors can change their positioning scale whenever.
 */
export interface AutoCursor<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground> extends Cursor<PointMarkerType, ResultTableBackgroundType> {
    /**
     * Set is ResultTable auto text fill style enabled.
     * When enabled, text of ResultTable will be automatically filled based on pointed data.
     * @param   enabled     Boolean flag
     * @return              Object itself
     * @sideEffect          When enabled, any fill style set operation on ResultTable might get overridden
     */
    setResultTableAutoTextStyle(enabled: boolean): this;
    /**
     * Get is ResultTable auto text fill style enabled.
     * When enabled, text of ResultTable will be automatically filled based on pointed data.
     * @return              Boolean flag
     */
    getResultTableAutoTextStyle(): boolean;
}
/**
 * StaticCursors are always positioned on the same scale.
 */
export interface StaticCursor<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground> extends Cursor<PointMarkerType, ResultTableBackgroundType> {
    /**
     * Set the position of the Cursor,
     * moving it without modifying displayed data.
     */
    setPosition: (position: Point) => this;
}
/**
 * Base class for all cursors.
 * @hidden Internal class
 */
declare abstract class CursorBase<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground> implements InternalCursor<PointMarkerType, ResultTableBackgroundType> {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    protected _pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>;
    protected _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>;
    /**
     * @param _layer                                Top layer of the rendering Engine
     * @param scale                                 Rendering scale of cursor. For dynamic cursor this is naturally not based on any axis
     * @param _pointMarkerConstructor               Constructor for PointMarker
     * @param _resultTableBackgroundConstructor     Constructor for ResultTableBackground
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>, _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>);
    /**
     * Points the Cursor at a given CursorPoint.
     * Updating its position and displayed data.
     * @param   cursorPoint Specifies new cursor location and content of result table
     */
    pointAt(cursorPoint: CursorPoint): this;
    /**
     * Get current position of Cursor
     * @return              Position on Cursors scale
     */
    getPosition(): Point;
    /**
     * Dispose of the owned pointMarker and resultTable.
     * @return  Object itself.
     */
    dispose(): this;
    /**
     * Restore the owned pointMarker and resultTable, restoring their child objects.
     * @return Object itself.
     */
    restore(): this;
    /**
     * @return True if all of this Cursor's child objects are disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Dispose PointMarker
     * @return Object itself for fluent interface
     */
    disposePointMarker(): this;
    /**
     * Restore PointMarker
     * @return Object itself for fluent interface
     */
    restorePointMarker(): this;
    /**
     * @return Weather PointMarker is disposed
     */
    isDisposedPointMarker(): boolean;
    /**
     * Mutator function for Cursors PointMarker.
     * PointMarker is a visual that is displayed at the Cursors position
     * @param   mutator     Mutator function for PointMarker
     * @return              Object itself for fluent interface
     */
    setPointMarker(mutator: Mutator<PointMarkerType>): this;
    /**
     * Get PointMarker object.
     * PointMarker is a visual that is displayed at the Cursors position
     * @returns             PointMarker object
     */
    getPointMarker(): PointMarkerType;
    /**
     * Dispose ResultTable
     * @return Object itself for fluent interface
     */
    restoreResultTable(): this;
    /**
     * Restore ResultTable
     * @return Object itself for fluent interface
     */
    disposeResultTable(): this;
    /**
     * @return Weather ResultTable is disposed
     */
    isDisposeResultTable(): boolean;
    /**
     * Mutator function for Cursors ResultTable.
     * ResultTable is a visual that displays currently pointed data next to its location
     * @param   mutator     Mutator function for ResultTable
     * @return              Object itself for fluent interface
     */
    setResultTable(mutator: Mutator<ResultTable<ResultTableBackgroundType>>): this;
    /**
     * Get ResultTable object.
     * ResultTable is a visual that displays currently pointed data next to its location
     * @returns             ResultTable object
     */
    getResultTable(): ResultTable<ResultTableBackgroundType>;
    /**
     * Set auto-fit strategy of Cursor.
     * Affects logic of automatic fitting of Cursors ResultTable to the screen.
     * @param   autoFitStrategy     AutoFitStrategy factory or undefined to disable auto-fitting
     * @returns                     Object itself for fluent interface
     */
    setAutoFitStrategy(autoFitStrategy?: AutoFitStrategyFactory<ResultTableBackgroundType>): this;
    /**
     * Get is auto-fit enabled.
     * Affects logic of automatic fitting of Cursors ResultTable to the screen.
     * @returns                     Boolean flag whether auto-fit is enabled
     */
    getAutoFitStrategy(): boolean;
}
/**
 * Base class for Auto cursors.
 * Users should create only using builders, not with constructor
 * @hidden Internal class
 */
export declare class InternalAutoCursor<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground> extends CursorBase<PointMarkerType, ResultTableBackgroundType> implements AutoCursor<PointMarkerType, ResultTableBackgroundType> {
    /**
     * Points the Cursor at a given CursorPoint.
     * Updating its position and displayed data.
     */
    pointAt(cursorPoint: CursorPoint): this;
    /**
     * Set is ResultTable auto text fill style enabled.
     * When enabled, text of ResultTable will be automatically filled based on pointed data.
     * @param   enabled     Boolean flag
     * @return              Object itself
     * @sideEffect          When enabled, any fill style set operation on ResultTable might get overridden
     */
    setResultTableAutoTextStyle(enabled: boolean): this;
    /**
     * Get is ResultTable auto text fill style enabled.
     * When enabled, text of ResultTable will be automatically filled based on pointed data.
     * @return              Boolean flag
     */
    getResultTableAutoTextStyle(): boolean;
}
/**
 * Base class for Static cursors.
 * Users should create only using builders, not with constructor
 * @hidden Interhal class
 */
export declare class InternalStaticCursor<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground> extends CursorBase<PointMarkerType, ResultTableBackgroundType> implements StaticCursor<PointMarkerType, ResultTableBackgroundType> {
    /**
     * Set position of cursor,
     * moving it without modifying displayed data.
     * @param   position    Position on Cursors scale
     * @return              Object itself
     */
    setPosition(position: Point): this;
}
/**
 * Mutator function that is used for modifying a Cursor during runtime.
 */
export declare type CursorStyler<T extends Cursor> = Mutator<T>;
/**
 * Base class for cursor builders.
 * Cursor builders build cursors with parts of types as indicated by the builders type.
 * All setters of Cursor builders create new builders based on their current state and don't modify the actual object.
 * @hidden Internal class. At the moment we do not allow users to create own cursors.
 */
export declare abstract class CursorBuilder<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, CursorType extends Cursor<PointMarkerType, ResultTableBackgroundType>> {
    protected _pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>;
    protected _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>;
    protected _stylers: CursorStyler<CursorType>[];
    /**
     * @param _pointMarkerConstructor            Constructor for PointMarker
     * @param _resultTableBackgroundConstructor  Constructor for Background of ResultTable
     * @param _stylers                           List of stylers
     * @hidden
     */
    constructor(_pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>, _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>, _stylers?: CursorStyler<CursorType>[]);
    /**
     * Create new CursorBuilder with an additional styler.
     * @param   cursorStyler    Cursor styler function
     * @returns                 CursorBuilder of same type
     */
    abstract addStyler: (cursorStyler: CursorStyler<CursorType>) => CursorBuilder<PointMarkerType, ResultTableBackgroundType, Cursor<PointMarkerType, ResultTableBackgroundType>>;
    /**
     * Create new CursorBuilder with a different PointMarker.
     * @param   pointMarkerConstructor  Constructor for PointMarker. See PointMarkers for a collection of options.
     * @returns                         CursorBuilder of same type
     */
    abstract setPointMarker: <T extends InternalPointMarker & PointMarkerType>(pointMarkerConstructor: PointMarkerConstructor<T>) => CursorBuilder<T, ResultTableBackgroundType, Cursor<T, ResultTableBackgroundType>>;
    /**
     * Create new CursorBuilder with a different ResultTable Background.
     * @param   resultTableBackgroundConstructor    Constructor for Background
     * @returns                                     CursorBuilder of same type
     */
    abstract setResultTableBackground: <T extends InternalBackground & ResultTableBackgroundType>(resultTableBackgroundConstructor: BackgroundConstructor<T>) => CursorBuilder<PointMarkerType, T, Cursor<PointMarkerType, T>>;
}
/**
 * Builder for auto cursors
 * @hidden
 */
export interface AutoCursorBuilder<CursorType extends Cursor> {
}
/**
 * Builder for auto-cursors without axes.
 */
export declare class AutoCursor2DBuilder<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground> extends CursorBuilder<PointMarkerType, ResultTableBackgroundType, AutoCursor<PointMarkerType, ResultTableBackgroundType>> implements AutoCursorBuilder<AutoCursor<PointMarkerType, ResultTableBackgroundType>> {
    /**
     * Create new CursorBuilder with an additional styler.
     * @param   cursorStyler    Cursor styler function
     * @returns                 CursorBuilder of same type
     */
    addStyler: (cursorStyler: Mutator<AutoCursor<PointMarkerType, ResultTableBackgroundType>>) => AutoCursor2DBuilder<PointMarkerType, ResultTableBackgroundType>;
    /**
     * Create new CursorBuilder with a different PointMarker.
     * @param   pointMarkerConstructor  Constructor for PointMarker. See PointMarkers for a collection of options.
     * @returns                         CursorBuilder of same type
     */
    setPointMarker: <T extends UIElement & PointMarker & PointMarkerType>(pointMarkerConstructor: PointMarkerConstructor<T>) => AutoCursor2DBuilder<T, ResultTableBackgroundType>;
    /**
     * Create new CursorBuilder with a different ResultTable Background.
     * @param   resultTableBackgroundConstructor Constructor for Background
     * @returns                                  CursorBuilder of same type
     */
    setResultTableBackground: <T extends InternalBackground & ResultTableBackgroundType>(resultTableBackgroundConstructor: BackgroundConstructor<T>) => AutoCursor2DBuilder<PointMarkerType, T>;
}
/**
 * Builder for static cursors without axes.
 */
export declare class StaticCursor2DBuilder<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground> extends CursorBuilder<PointMarkerType, ResultTableBackgroundType, StaticCursor<PointMarkerType, ResultTableBackgroundType>> {
    /**
     * Create new CursorBuilder with an additional styler.
     * @param   cursorStyler    Cursor styler function
     * @returns                 CursorBuilder of same type
     */
    addStyler: (cursorStyler: Mutator<StaticCursor<PointMarkerType, ResultTableBackgroundType>>) => StaticCursor2DBuilder<PointMarkerType, ResultTableBackgroundType>;
    /**
     * Create new CursorBuilder with a different PointMarker.
     * @param   pointMarkerConstructor  Constructor for PointMarker. See PointMarkers for a collection of options.
     * @returns                         CursorBuilder of same type
     */
    setPointMarker: <T extends UIElement & PointMarker & PointMarkerType>(pointMarkerConstructor: PointMarkerConstructor<T>) => StaticCursor2DBuilder<T, ResultTableBackgroundType>;
    /**
     * Create new CursorBuilder with a different ResultTable Background.
     * @param   resultTableBackgroundConstructor    Constructor for Background
     * @returns                                     CursorBuilder of same type
     */
    setResultTableBackground: <T extends InternalBackground & ResultTableBackgroundType>(resultTableBackgroundConstructor: BackgroundConstructor<T>) => StaticCursor2DBuilder<PointMarkerType, T>;
}
export {};
/**
 * File contains definition and default implementations of PointMarker,
 * a purely decorative visual part of all Cursors
 */
/**
 * Visual that is displayed at the Cursors position.
 * Has customizable fill and border.
 */
export interface PointMarker extends Marginable {
    /**
     * Set origin position of PointMarker
     * @param   origin  (-1 to 1 which specifies position of origin, 0 is center of the object)
     * @returns         Object itself for fluent interface
     */
    setOrigin: (origin: Point) => this;
    /**
     * Get origin position of PointMarker
     * @returns         (-1 to 1 which specifies position of origin, 0 is center of the object)
     */
    getOrigin: () => Point;
    /**
     * Set size of PointMarker
     * @param   size        Size of PointMarker in pixels
     * @returns             Object itself
     */
    setSize: (size: Point) => this;
    /**
     * Get size of PointMarker
     * @returns             Size of PointMarker in pixels
     */
    getSize: () => Point;
    /**
     * Set fillStyle of PointMarker
     * @param   fillStyle   FillStyle object or mutator to modify existing one
     * @returns             Object itself
     */
    setFillStyle: (fillStyle: FillStyle | ImmutableMutator<FillStyle>) => this;
    /**
     * Get fillStyle of PointMarker
     * @returns             FillStyle object
     */
    getFillStyle: () => FillStyle;
    /**
     * Set stroke style of PointMarker
     * @param   value   LineStyle object
     * @returns         Object itself
     */
    setStrokeStyle: (value: LineStyle | ImmutableMutator<LineStyle>) => this;
    /**
     * Get stroke style of PointMarker
     * @returns         LineStyle object
     */
    getStrokeStyle: () => LineStyle;
    /**
     * @return True if all child objects are disposed, false if not.
     */
    isDisposed(): boolean;
}
/**
 * Internal type used to limit access to PointMarker
 * @hidden
 */
export declare type InternalPointMarker = UIElement & PointMarker;
/**
 * Type of constructor for PointMarker
 * @hidden
 */
export declare type PointMarkerConstructor<T extends InternalPointMarker = InternalPointMarker> = new (layer: LayerXY, scale: Vec2<Scale>, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>) => T;
/**
 * File contains definition and implementations of ResultTable,
 * a visual part of all Cursors whose purpose is to show information about the data-point the Cursor is pointing at.
 */
/**
 * Interface that represents content displayable by a ResultTable.
 *
 * Currently simply a grid of strings, but in the future this could be extended to contain images or such.
 */
export declare type ResultTableContent = Array<string | undefined>[];
/**
 * Class for user customizable building of 'TableContent'.
 * Basically the way users modify what cursors show (on level of a single series), is to
 * set a function that builds TableContent based on information given by the series.
 * Internal class
 */
export declare abstract class TableContentBuilder {
    /**
     * Add a row to built content.
     * @param   cells   Any amount of cells row should contain. Undefined or '' marks a "gap", which will occupy any extra space of row.
     * @return          Object itself
     */
    addRow(...cells: (string | undefined)[]): this;
}
/**
 * Internal class for TableContentBuilder.
 * This contains the methods that are not visible to users.
 * @hidden Internal class
 */
export declare class InternalTableContentBuilder extends TableContentBuilder {
}
/**
 * Public interface for ResultTable.
 * Part of Cursor that displays information about current data-point.
 */
export interface ResultTable<BackgroundType extends UIBackground = UIBackground> extends Marginable {
    /**
     * Set displayed data of ResultTable
     * @param   data    TableContent
     * @returns         Object itself for fluent interface
     */
    setContent: (data: ResultTableContent) => this;
    /**
     * Set origin position of ResultTable
     * @param   origin  (-1 to 1 which specifies position of origin, 0 is center of the object)
     * @returns         Object itself for fluent interface
     */
    setOrigin: (origin: Point) => this;
    /**
     * Get origin position of v
     * @returns         (-1 to 1 which specifies position of origin, 0 is center of the object)
     */
    getOrigin: () => Point;
    /**
     * Set text fillStyle of ResultTable text
     * @param   fillStyle   FillStyle object or mutator to modify existing one
     * @returns             Object itself
     */
    setTextFillStyle: (fillStyle: FillStyle | ImmutableMutator<FillStyle>) => this;
    /**
     * Get text fillStyle of ResultTable
     * @returns             FillStyle object
     */
    getTextFillStyle: () => FillStyle;
    /**
     * Set font of ResultTable.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Object itself for fluent interface
     */
    setFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of ResultTable.
     * @return          FontSettings
     */
    getFont(): FontSettings;
    /**
     * Mutator function for Background of ResultTable.
     * @param   mutator Mutator function
     * @return          Object itself for fluent interface
     */
    setBackground(mutator: Mutator<BackgroundType>): this;
    /**
     * Get background object of ResultTable
     * @return          Background object
     */
    getBackground(): BackgroundType;
}
/**
 * Internal ResultTable class.
 * @hidden Internal class
 */
export declare class InternalResultTable<BackgroundClass extends UIBackground = UIBackground> extends UIRowGrid<BackgroundClass> implements ResultTable<BackgroundClass> {
    /**
     * Set displayed data of ResultTable
     * @param   content TableContent
     * @returns         Object itself for fluent interface
     */
    setContent(content: ResultTableContent): this;
    restore(): this;
    /**
     * Set text fill style
     * @param value Fill style object or mutator to modify existing one
     * @return      Object itself for fluent interface
     */
    setTextFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * @return Current fill style object
     */
    getTextFillStyle(): FillStyle;
    /**
     * Set font of Label.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Object itself
     */
    setFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Label.
     * @return          FontSettings
     */
    getFont(): FontSettings;
}
/**
 * Enum that defines layer indices of PieChart.
 * @hidden
 */
export declare enum LayerIndices {
    bg = 0,
    bottom = 1,
    top = 2,
    ui = 3
}
declare type SliceTypes = PieSlice | FunnelSlice;
/**
 * SliceLabelIndices enum defines types of Slice labels .
 */
export declare enum SliceLabelIndices {
    LabelsInsideSlices = 0,
    LabelsOnSides = 1
}
/**
 * Interface exists for enforcing shared APIs between Pie, Funnel and Pyramid Charts.
 */
export interface SlicedCharts<T extends SliceTypes> {
    /**
     * Set fill style of Slices Labels.
     * @param   value   FillStyle object or function which creates a new style based on previous
     * @return          Chart itself
     */
    setLabelFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Slice Labels.
     * @return  FillStyle object
     */
    getLabelFillStyle(): FillStyle;
    /**
     * Set font of Slice Labels.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Chart itself
     */
    setLabelFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Slice Labels.
     * @return  FontSettings
     */
    getLabelFont(): FontSettings;
    /**
     * Set formatter of Slice Labels.
     *
     * See SliceLabelFormatters for a collection of default options.
     * @param   labelFormatter  SliceLabelFormatter - function which generates text of Labels per Slice.
     * @return                  Chart itself
     */
    setLabelFormatter(labelFormatter: SliceLabelFormatter<T>): this;
    /**
     * Get formatter of Slice Labels.
     * @return  SliceLabelFormatter - function which generates text of Labels per Slice.
     */
    getLabelFormatter(): SliceLabelFormatter<T>;
    /**
     * Set style of Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Chart will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Sliced Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @param   sliceFillStylePalette   Palette for FillStyle objects
     * @return                          Chart itself
     */
    setSliceFillStyle(sliceFillStylePalette: Palette<FillStyle>): this;
    /**
     * Get style of Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Chart will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Sliced Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @return  Palette<FillStyle>
     */
    getSliceFillStyle(): Palette<FillStyle>;
    /**
     * Set style of Slices Stroke.
     * @param   value   LineStyle object or function which creates a new style based on previous
     * @return          Chart itself
     */
    setSliceStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of Slices Stroke.
     * @return  LineStyle object
     */
    getSliceStrokeStyle(): LineStyle;
    /**
     * Set sorter of Slices as a comparator-function.
     *
     * For some commonly needed default implementations, can refer to **SliceSorters**-collection.
     * @param   sliceSorter SliceSorter - function which sorts Slices of the Chart with JavaScript API: Array.sort.
     * @return              Chart itself
     */
    setSliceSorter(sliceSorter: SliceSorter<T>): this;
    /**
     * Get sorter of Slices as a comparator-function.
     * @return  SliceSorter - function which sorts Slices of the Chart with JavaScript API: Array.sort.
     */
    getSliceSorter(): SliceSorter<T>;
    /**
     * This method is used for the adding slices in the Chart.
     * @param titile Slice title
     * @param value  Slice value
     */
    addSlice(title: string, value: number): T;
    /**
     * This method is used for the adding multiple slices in the Chart.
     * @param multiSlice Array of slices
     */
    addSlices(multiSlice: {
        name: string;
        value: number;
    }[]): Array<T>;
}
/**
 * Type of function which is used to sort Slices of a Chart with Slices.
 * It is a comparator function used with JavaScript API: Array.sort.
 *
 * See **SliceSorters**-collection for quick access to some example implementations.
 *
 * Use with *SlicedCharts*.**setSliceSorter()**
 *
 * Example usage:
 *
 * | Desired result                 | Usage                                                                 |
 * | :----------------------------- | :-------------------------------------------------------------------- |
 * | Use a default implementation   | *SlicedCharts*.setSliceSorter(**SliceSorters.SortByValueDescending**)  |
 * | Use a custom implementation    | *SlicedCharts*.setSliceSorter((a, b) => a.getValue() - b.getValue())      |
 * @param   sliceA  Slice A
 * @param   sliceB  Slice B
 * @return          Number which implies the sorted order between Slices A and B.
 *                  For more details, refer to Array documentation.
 */
export declare type SliceSorter<T extends SliceTypes> = (sliceA: T, sliceB: T) => number;
/**
 * Collection of some example implementations of *SliceSorter*.
 *
 * Use with *SlicedCharts*.**setSliceSorter()**
 *
 * Example usage:
 *
 * | Desired result                 | Usage                                                                 |
 * | :----------------------------- | :-------------------------------------------------------------------- |
 * | Use a default implementation   | *SlicedCharts*.setSliceSorter(**SliceSorters.SortByValueDescending**)  |
 * | Use a custom implementation    | *SlicedCharts*.setSliceSorter((a, b) => a.getValue() - b.getValue())      |
 */
export declare const SliceSorters: {
    /**
     * SliceSorter that sorts Slices based on their names using JS API: String.localeCompare.
     */
    SortByName: SliceSorter<SliceTypes>;
    /**
     * SliceSorter that sorts Slices to ascending value order.
     */
    SortByValueAscending: SliceSorter<SliceTypes>;
    /**
     * SliceSorter that sorts Slices to descending value order.
     */
    SortByValueDescending: SliceSorter<SliceTypes>;
    /**
     * Disabled Slice sorting.
     */
    None: SliceSorter<SliceTypes>;
};
/**
 * Type of function which is used to format text of Slice Labels.
 * It is a function which generates a string based on a Slice along with some additional information.
 *
 * See **SliceLabelFormatters**-collection for quick access to some example implementations.
 *
 * Use with *SlicedCharts*.**setLabelFormatter()**
 *
 * Example usage:
 *
 * | Desired result                 | Usage                                                                             |
 * | :----------------------------- | :-------------------------------------------------------------------------------- |
 * | Use a default implementation   | *SlicedCharts*.setLabelFormatter(SliceLabelFormatters.NamePlusRelativeValue)       |
 * | Use a custom implementation    | *SlicedCharts*.setLabelFormatter((slice, relativeValue) => slice.getValue() + ' €')   |
 * @param   slice           Slice
 * @param   relativeValue   Value of the Slice as a % of all Slice values
 * @return                  String text for Label
 */
export declare type SliceLabelFormatter<T extends SliceTypes> = (slice: T, relativeValue: number) => string;
/**
 * Collection of some example implementations of *SliceLabelFormatter*.
 *
 * Use with *SlicedCharts*.**setLabelFormatter()**
 *
 * Example usage:
 *
 * | Desired result                 | Usage                                                                             |
 * | :----------------------------- | :-------------------------------------------------------------------------------- |
 * | Use a default implementation   | *SlicedCharts*.setLabelFormatter(**SliceLabelFormatters.NamePlusRelativeValue**)   |
 * | Use a custom implementation    | *SlicedCharts*.setLabelFormatter((slice, relativeValue) => slice.getValue() + ' €')   |
 */
export declare const SliceLabelFormatters: {
    /**
     * Slice Label formatter for `${name}`.
     */
    Name: SliceLabelFormatter<SliceTypes>;
    /**
     * Slice Label formatter for `${name}: ${Math.round(animatedValue)}`.
     */
    NamePlusValue: SliceLabelFormatter<SliceTypes>;
    /**
     * Slice Label formatter for `${name}: ${(relativeValue * 100).toFixed(1)}%`.
     */
    NamePlusRelativeValue: SliceLabelFormatter<SliceTypes>;
};
export {};
/**
 * Class that represents a single Slice of a Pie Chart.
 */
export declare abstract class Slice<SliceVisual extends ChartVisual> extends ChartComponent<SliceVisual> {
    /**
     * Set value of Slice.
     * @param   value   Numeric value
     * @return          Slice itself
     */
    abstract setValue(value: number): this;
    /**
     * Get value of Slice.
     * @return          Numeric value
     */
    abstract getValue(): number;
    /**
     * Get animated value of Slice.
     *
     * This always returns the currently **rendered value** of the Slice, which might be delayed by animations.
     * @return          Numeric value
     */
    abstract getAnimatedValue(): number;
}
/**
 * Type of data-structure that defines how an axis label is positioned.
 */
export interface SpiderAxisLabelPosition {
    /**
     * Alignment X [-1, 1], where -1 is left and 1 is right extreme
     */
    alignmentX: number;
    /**
     * Alignment Y [-1, 1], where -1 is bottom and 1 is top extreme
     */
    alignmentY: number;
    /**
     * Padding in X direction as pixels
     */
    paddingX: number;
    /**
     * Padding in Y direction as pixels
     */
    paddingY: number;
}
/**
 * Type of an axis label strategy function.
 * Defines how axis labels are aligned.
 * @param   result              DataStructure that is used to pass result
 * @param   axisIndex           Index of axis. 0 is always directly up
 * @param   axisCount           Amount of axes in chart
 * @param   axisTag             Name of axis
 * @param   axisAngle           Angle of axis in radians
 * @param   labelPadding        Label padding as set in chart
 * @return                      SpiderAxisLabelPosition (modified first parameter of function)
 */
export declare type SpiderAxisLabelStrategy = (result: SpiderAxisLabelPosition, axisIndex: number, axisCount: number, axisTag: string, axisAngle: number, labelPadding: number) => SpiderAxisLabelPosition;
/**
 * Type of data-structure that defines how an axis label is positioned on a Spider Chart.
 */
export interface SpiderScaleLabelPosition {
    /**
     * Alignment X [-1, 1], where -1 is left and 1 is right extreme
     */
    alignmentX: number;
    /**
     * Alignment Y [-1, 1], where -1 is bottom and 1 is top extreme
     */
    alignmentY: number;
    /**
     * Padding in X direction as pixels
     */
    paddingX: number;
    /**
     * Padding in Y direction as pixels
     */
    paddingY: number;
}
/**
 * Type of a scale label strategy function.
 * Defines how scale labels are aligned.
 * @param   result              DataStructure that is used to pass result
 * @param   axisIndex           Index of axis. 0 is always directly up
 * @param   axisCount           Amount of axes in chart
 * @param   axisTag             Name of axis
 * @param   axisAngle           Angle of axis in radians
 * @param   webIndex            Index of web. 0 is always the outer-edge of spider
 * @param   webCount            Amount of webs in chart
 * @param   labelPadding        Label padding as set in chart
 * @return                      SpiderScaleLabelPosition (modified first parameter of function) or undefined to not display label
 */
export declare type SpiderScaleLabelStrategy = (result: SpiderScaleLabelPosition, axisIndex: number, axisCount: number, axisTag: string, axisAngle: number, webIndex: number, webCount: number, labelPadding: number) => SpiderScaleLabelPosition | undefined;
/**
 * Container for shapes of spider axes and drawing logic.
 * @hidden Internal class
 */
export declare class SpiderAxis {
    readonly gridLayer: LayerXY<Engine>;
    readonly labelLayer: LayerXY<Engine>;
    readonly scale: Vec2<Scale>;
    readonly chart: SpiderChart;
    readonly tag: string;
    readonly axisScale: Scale;
    private _setupMouseInteractions;
    private readonly _remove;
    private readonly _restore;
    /**
     * Axis line
     */
    shapeAxis: Line;
    /**
     * Axis tag label
     */
    shapeTag: Text;
    /**
     * Nib shape
     */
    shapeNib: LineSet;
    /**
     * @param  gridLayer                Rendering layer for axis line
     * @param  labelLayer               Rendering layer for axis labels and nib
     * @param  scale                    Scale object used in rendering axis shapes. Must be in pixels!
     * @param  chart                    SpiderChart object which would contain this axis. Is used to query chart margins
     * @param  tag                      String tag of the axis
     * @param  axisScale                Reference to axisScale of chart. Mainly used for cursor formating
     * @param  _setupMouseInteractions   Injected method that adds mouse-interactions to axis nib
     * @param  _remove                   Injected remove method from owner, used to remove Axis from the collection it's in.
     */
    constructor(gridLayer: LayerXY<Engine>, labelLayer: LayerXY<Engine>, scale: Vec2<Scale>, chart: SpiderChart, tag: string, axisScale: Scale, _setupMouseInteractions: (axis: SpiderAxis, nib: LineSet) => LineSet, _remove: RemoveHandler<SpiderAxis>, _restore: RestoreHandler<SpiderAxis>);
    /**
     * Update axis label style and return its computed size.
     * Used for computation of chart margins before drawing.
     */
    getLabelSize(): Point;
    /**
     * Disposes SpiderAxis' shapes from its rendering engine, then tell owner to remove this SpiderAxis from its collections.
     */
    dispose(): void;
    /**
     * Restore the SpiderAxis back to the SpiderChart it belongs to.
     */
    restore(): void;
    /**
     * Get the isDisposed state of child objects.
     * @return  True if all child objects are disposed, false if any are not.
     */
    isDisposed(): boolean;
}
/**
 * Interface that can be used to define *Spider Chart* configurations that can't be changed after creation.
 *
 * Example usage:
 *
 * | Desired result                                 | Value                                                                                                     |
 * | :--------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
 * | Default                                        | *undefined*                                                                                               |
 * | Specified AutoCursor ResultTable Background    | { **autoCursorBuilder:** *AutoCursorBuilders*.Spider.setResultTableBackground(*UIBackgrounds*.Circle) }   |
 */
export interface SpiderChartOptions<CursorPointMarkerType extends PointMarker = PointMarker, CursorResultTableBackgroundType extends UIBackground = UIBackground> {
    /**
     * Builder for the Charts AutoCursor. If omitted, a default one will be used.
     * AutoCursorBuilders.Spider can be used to build a custom one from scratch.
     */
    autoCursorBuilder?: AutoCursor2DBuilder<CursorPointMarkerType, CursorResultTableBackgroundType>;
}
/**
 * Chart for visualizing data in a radial form as dissected by named axes.
 *
 * *Charts* are created by methods of *LightningChart*-interface or a *Dashboard*.
 *
 * A *SpiderChart* can have any number of *SpiderSeries* added to it using *SpiderChart*.**addSeries**.
 * Data can then be pushed in with *SpiderSeries*.**addPoints()**.
 *
 * By default, *SpiderChart* automatically creates *Axes* based on the data that are pushed to its *Series*.
 */
export declare class SpiderChart<CursorPointMarkerType extends PointMarker = PointMarker, CursorResultTableBackgroundType extends UIBackground = UIBackground> extends Chart2D<SpiderSeries, CursorPointMarkerType, CursorResultTableBackgroundType, AutoCursor<CursorPointMarkerType, CursorResultTableBackgroundType>> {
    /**
     * Scale of axes. Used for formatting and scaling series
     */
    readonly axisScale: Scale;
    /**
     * @param layerSupplier         Rendering layer supplier
     * @param logoFactory           Logo factory.
     * @param autoCursorBuilder     AutoCursorBuilder. If undefined or omitted, auto cursor will be disabled
     * @param ScaleX                Injectable Scale constructor
     * @param ScaleY                Injectable Scale constructor
     * @param onScaleChange         Injectable subscribe method for when chart should update its positioning logic (used for dashboard)
     * @param panelMargin           Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, logoFactory?: LogoFactory, spiderChartOptions?: SpiderChartOptions<CursorPointMarkerType, CursorResultTableBackgroundType>, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number);
    /**
     * Add a new axis to Spider Chart
     * @param axis  Axis tag
     * @returns     Object itself
     */
    addAxis(tagOrAxis: string): this;
    /**
     * Remove axis from Spider Chart
     * @param tagOrAxis     Axis or tag of an Axis which has to be removed
     * @returns             Object itself for fluent interface
     */
    removeAxis: (tagOrAxis: string | SpiderAxis) => this;
    /**
     * Restore given axis to the Spider Chart.
     * @param   axis    Axis to restore.
     * @return          This.
     */
    restoreAxis: (axis: SpiderAxis) => this;
    /**
    * Check if Chart has an Axis with specified tag
    * @param tag   Name of desirable axis
    * @returns     True if axis exists, false if not.
    */
    hasAxis: (tag: string) => boolean;
    /**
     * Format value along an axis.
     * @param   value       Value along an axis
     * @param   formater    Optional explicit formating function
     * @return              Value formated to string
     */
    formatValue: (value: number) => string;
    /**
     * Adds a new SpiderSeries to the SpiderChart.
     * @param   pointShape  Shape of points for SpiderSeries. Defaults to PointShape.Circle
     *
     * @returns             SpiderSeries instance
     */
    addSeries(pointShape?: PointShape): SpiderSeries;
    /**
     * Get number of series inside chart.
    * @return Amount of series inside chart
     */
    getSeriesCount(): number;
    /**
     * Set mode of SpiderCharts web and background.
     * @param   webMode     Enum SpiderWebMode
     * @return              Object itself
     */
    setWebMode(webMode: SpiderWebMode): this;
    /**
     * Get mode of SpiderCharts web and background.
     * @return              Enum SpiderWebMode
     */
    getWebMode(): SpiderWebMode;
    /**
     * Set count of 'webs' displayed.
     * @param   webCount    Count of web lines
     * @return              Object itself
     */
    setWebCount(webCount: number): this;
    /**
     * Get count of 'webs' displayed
     * @return              Count of web lines
     */
    getWebCount(): number;
    /**
     * Set style of spider charts webs as LineStyle.
     * @param   value   LineStyle object or mutator to modify existing one
     * @return          Object itself
     */
    setWebStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get fill style of web lines.
     * @return              LineStyle object
     */
    getWebStyle(): LineStyle;
    /**
     * Set fill style of scale labels.
     * @param   value   FillStyle object or mutator to modify existing one
     */
    setScaleLabelStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of scale labels.
     * @return              FillStyle object
     */
    getScaleLabelStyle(): FillStyle;
    /**
     * Set font of scale labels.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Object itself
     */
    setScaleLabelFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of scale labels.
     * @return          FontSettings
     */
    getScaleLabelFont(): FontSettings;
    /**
     * Set padding of scale labels.
     * @param   padding     Padding in pixels
     * @return              Object itself
     */
    setScaleLabelPadding(padding: pixel): this;
    /**
     * Get padding of scale labels.
     * @return              Padding in pixels
     */
    getScaleLabelPadding(): pixel;
    /**
     * Set strategy for drawing scale labels.
     * Defines on which positions labels are drawn and whether they are flipped or not.
     * @param   scaleLabelStrategy  SpiderScaleLabelStrategy or undefined to never show scale labels
     * @return                      Object itself
     */
    setScaleLabelStrategy(scaleLabelStrategy?: SpiderScaleLabelStrategy): this;
    /**
     * Set fill style of axis labels.
     * @param   value   FillStyle object or mutator to modify existing one
     * @return                      Object itself
     */
    setAxisLabelStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of axis labels.
     * @return              FillStyle object
     */
    getAxisLabelStyle(): FillStyle;
    /**
     * Set font of axis labels.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Object itself
     */
    setAxisLabelFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of axis labels.
     * @return          FontSettings object
     */
    getAxisLabelFont(): FontSettings;
    /**
     * Set padding of axis labels.
     * NOTE: The value of this padding is simply passed to the axis label strategy of chart,
     * so overriding the default strategy will naturally leave the handling of padding logic up to you.
     * @param   padding     Padding in pixels
     * @return              Object itself
     */
    setAxisLabelPadding(padding: pixel): this;
    /**
     * Get padding of axis labels.
     * NOTE: The value of this padding is simply passed to the axis label strategy of chart,
     * so overriding the default strategy will naturally leave the handling of padding logic up to you.
     * @return              Padding in pixels
     */
    getAxisLabelPadding(): pixel;
    /**
     * Set strategy for drawing axis labels.
     * Defines how axis labels are aligned.
     * @param   axisLabelStrategy   SpiderAxisLabelStrategy or undefined to never show axis labels
     * @return                      Object itself
     */
    setAxisLabelStrategy(axisLabelStrategy?: SpiderAxisLabelStrategy): this;
    /**
     * Set style of axes as SolidLine.
     * @param   value       SolidLine object or mutator to modify existing one
     * @return              Object itself
     */
    setAxisStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Get style of axes as SolidLine.
     * @return              SolidLine object
     */
    getAxisStyle(): SolidLine;
    /**
     * Set style of axis nibs as SolidLine.
     * @param   value       SolidLine object or mutator to modify existing one
     * @return              Object itself
     */
    setNibStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Get style of axis nibs as SolidLine.
     * @return              SolidLine object
     */
    getNibStyle(): SolidLine;
    /**
     * Set length of axis nibs in pixels.
     * @param   length      Sum length of nibs in pixels (both directions)
     */
    setNibLength(length: number): this;
    /**
     * Get length of axis nibs in pixels.
     * @return              Length of nibs in pixels
     */
    getNibLength(): number;
    /**
     * Specifies if auto creation of axis is turned on or not
     * @param   createAxesAutomatically     State of automatic axis creation
     * @returns                             Object itself for fluent interface
     */
    setAutoAxis(createAxesAutomatically: boolean): this;
    /**
     * @return Automatic axis creation state
     */
    getAutoAxis(): boolean;
    /**
     * Sets if animations are enabled or not
     */
    setAnimationsEnabled(animationsEnabled: boolean): this;
    /**
     * Gets if animations are enabled or not
     */
    getAnimationsEnabled(): boolean;
    /**
     * Set if mouse-interactions on chart are enabled or not
     * @param   enabled     Boolean flag
     * @return              Object itself
     */
    setMouseInteractions(enabled: boolean): this;
    /**
     * Get are mouse-interactions on chart enabled or not
     * @return              Boolean flag
     */
    getMouseInteractions(): boolean;
    /**
     * Sets the AxisScrollStrategy of Charts Axes
     * @param scrollStrategy    AxisScrollStrategy or undefined to disable automatic scrolling.
     *                          See AxisScrollStrategies for a collection of options.
     * @returns                 Object itself
     */
    setAxisScrollStrategy(scrollStrategy?: AxisScrollStrategy): this;
    /**
     * Gets the AxisScrollStrategy of Charts Axes
     */
    getAxisScrollStrategy(): AxisScrollStrategy | undefined;
    /**
     * Set interval of Charts Axes
     * @param   edge    Value at edges of chart
     * @param   center  Value at center of chart. Defaults to zero
     * @return          Object itself
     */
    setAxisInterval(edge: number, center?: number): this;
    /**
     * Get axis value at center of chart
     * @return          Value at center of chart
     */
    getOriginValue(): number;
    /**
     * Get axis value at edges of chart
     * @return          Value at edges of chart
     */
    getEdgeValue(): number;
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Vec2 minimum size or undefined if unimplemented
     */
    getMinimumSize(): Point | undefined;
}
/**
 * Interface for data-structure that is used to pass data-points to SpiderSeries.
 */
export interface SpiderPoint {
    /**
     * Name of Axis in SpiderChart.
     */
    axis: string;
    /**
     * Numeric data value.
     */
    value: number;
}
/**
 * Type of visual plotted by SpiderSeries.
 * @hidden
 */
export declare type SpiderChartVisual = Polygon | PointSet;
/**
 * Class that represents a collection of linked data-points inside a *SpiderChart*.
 *
 * Given data is visualized in the form of a *polygon*, where each *SpiderPoint* is an edge
 * along an *Axis*. This *polygon* can be styled with 3 independent areas:
 * - fill
 * - border
 * - points
 *
 * Data is pushed with *SpiderSeries*.**addPoints()** in form: **{ axis: string, value: number }**
 */
export declare class SpiderSeries extends Series2D<SpiderChartVisual> implements Pointed {
    protected _chart: SpiderChart;
    readonly scale: Vec2<Scale>;
    private readonly _pointShape;
    private _informOfAxis;
    private readonly _axes;
    private _getPointLocation;
    private _solveNearestAxis;
    /**
     * @param   engine              Rendering layer of series
     * @param   ui                  Rendering layer of series ui-elements (Cursor basically)
     * @param   _chart              Owning chart of series
     * @param   scale               Rendering scale of series
     * @param   _pointShape         Shape for points of PointSeries
     * @param   _informOfAxis       Injected function that informs the chart of a tag referred by user
     * @param   _axes               Reference to list of arrays in owning chart for rendering
     * @param   _getPointLocation   Injected function that find the location of a point on an axis
     * @param   _solveNearestAxis   Injected function that solves the nearest axis from a screen location
     * @hidden
     */
    constructor(engine: LayerXY, _chart: SpiderChart, scale: Vec2<Scale>, _pointShape: PointShape, _informOfAxis: (axis: string) => void, _axes: SpiderAxis[], _getPointLocation: (axis: string, value: number) => Point | undefined, _solveNearestAxis: (location: Point) => SpiderAxis | undefined, _removeFromChart: RemoveHandler<SpiderSeries>, _restoreFromChart: RestoreHandler<SpiderSeries>);
    /**
     * Adds an arbitrary amount of SpiderPoints to the Series.
     *
     * Animates transition if its enabled on owning chart.
     * @param   points  List of SpiderPoints as {'axis': string, 'value': number}
     * @returns         Object itself
     */
    addPoints(...points: SpiderPoint[]): this;
    /**
     * Returns the respective value of a data-point with the given tag (if any)
     * @param   animated    If set to true, will take series animating into account for result
     */
    getValue(tag: string, animated?: boolean): number | undefined;
    /**
     * Set animation for adding points.
     * @param   easing      Type of easing for animation or undefined to disable animations
     * @param   duration    Custom duration for animation in milliseconds.
     * @return              Object itself
     */
    setAnimationAddPoints(easing?: AnimationEasing, duration?: number): this;
    /**
     * Set animation for disabling/enabling series.
     * @param   easing      Type of easing for animation or undefined to disable animations
     * @param   duration    Custom duration for animation in milliseconds.
     * @return              Object itself
     */
    setDisposeAnimation(easing?: AnimationEasing, duration?: number): this;
    /**
     * Method for customizing contents of ResultTables when pointing at this Series.
     * @param   formatter   Function which builds ResultTable content.
     *                      See definition of SpiderSeriesFormatter for supplied formatting information.
     * @return              Object itself
     */
    setResultTableFormatter(formatter: SpiderSeriesFormatter): this;
    /**
     * Get ResultTable Formatter.
     * @return  Function which builds ResultTable content for SpiderSeries.
     */
    getResultTableFormatter(): SpiderSeriesFormatter;
    /**
     * Set fill style of the Polygon that represents the shape of the Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | ~~*emptyFill*~~                        |
     *
     * @param value  FillStyle which has to be used for recoloring or mutator to modify existing one.
     * @returns      Series itself for fluent interface.
     */
    setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * @return  Current series fill style
     */
    getFillStyle(): FillStyle;
    /**
     * Set fill style of the highlighted Polygon that represents the shape of the Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | ~~*emptyFill*~~                                                                           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value  FillStyle which has to be used for recoloring or mutator to modify existing one.
     * @returns      Series itself for fluent interface.
     */
    setFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Gets the highlighted fillStyle of the Polygon that represents the shape of this Series
     */
    getFillStyleHighlight(): FillStyle | undefined;
    /**
    * Set stroke style of the Polygon that represents the shape of the Series.
    *
    * Example usage:
    *
    * | Desired result         | Argument                                                                                  |
    * | :--------------------- | :---------------------------------------------------------------------------------------- |
    * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
    * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
    * | Hidden                 | *emptyLine*                                                                               |
    *
    * @param   value        Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
    * @returns              Chart itself
    */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Gets the stroke style of the Polygon that represents the shape of this Series
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of the highlighted Polygon that represents the shape of the Series.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | *emptyLine*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value       Either a SolidLine object or a function, which will be used to modify current value.
     * @returns             Chart itself
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke style of highlighted polygon.
     * @return              LineStyle or undefined for auto assignment
     */
    getStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set point fill style of Series.
     * Use *IndividualPointFill* object to enable individual coloring of points.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param fillStyle     FillStyle which has to be used for recoloring or mutator to modify existing one.
     * @returns             Series itself for fluent interface.
     */
    setPointFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * @return  Current point fill style
     */
    getPointFillStyle(): FillStyle;
    /**
     * Set point fill style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value FillStyle which has to be used during highlighting or mutator to modify existing one or undefined for auto.
     * @returns     Series itself for fluent interface.
     */
    setPointFillStyleHighlight(fillStyle: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * @return  Current highlight point fill style
     */
    getPointFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set size of point in pixels
     * @param   size    Size of point in pixels
     * @returns         Object itself for fluent interface
     */
    setPointSize(size: number): this;
    /**
     * @returns Size of point in pixels
     */
    getPointSize(): number;
    /**
     * Get shape of points.
     *
     * This is defined upon creation of series, and cannot be changed afterwards.
     * @returns PointShape
     */
    getPointShape(): PointShape;
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Solves the nearest datapoint to a given coordinate on screen.
     * @param   location    Location on screen
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromScreen(location: Point): undefined | CursorPoint;
    /**
     * Solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: SpiderChartVisual): undefined | CursorPoint;
    /**
     * Enable or disable the series
     * @param enabled True for enabled and false for disabled
     * @returns       Series itself for fluent interface
     */
    dispose(): this;
    /**
     * Enable or disable the series
     * @param enabled True for enabled and false for disabled
     * @returns       Series itself for fluent interface
     */
    restore(): this;
    /**
     * Enable or disable forced highlighting of series
     * @param highLight True for enabled and false for disabled
     * @returns         Series itself for fluent interface
     */
    setHighlighted(highLight: boolean): this;
}
/**
 * Interface for a function which builds ResultTable content when pointing at a SpiderSeries.
 * @param   tableContentBuilder     Builder that is used to build contents of ResultTable.
 *                                  Use addRow() method for adding content.
 * @param   series                  SpiderSeries
 * @param   value                   Value along axis
 * @param   axis                    Name of axis
 * @param   formatValue             Formating function for values along axis
 * @return                          TableContentBuilder that was supplied
 */
export declare type SpiderSeriesFormatter = <T extends TableContentBuilder>(tableContentBuilder: T, series: SpiderSeries, value: number, axis: string, formatValue: (value: number) => string) => T;
/**
 * Enum for selecting shape of *SpiderChart* "webs" - background, GridStrokes and nibs.
 *
 * Use with *SpiderChart*.**setWebMode()**
 */
export declare enum SpiderWebMode {
    /**
     * Traditional Spider Chart with non-curved edges.
     */
    Normal = 0,
    /**
     * Background, GridStrokes and nibs will be drawn circular.
     */
    Circle = 1
}
/**
 * Includes the so-called "BasicSeries"
 * Which is a XY-Series that relies on ShapeSet's as its segments.
 * Extends to CurveSeries, PointSeries and their combination PointLineSeries
 *
 */
/**
 * Type requirement for Shapes which are used to render a BasicSeries.
 * @hidden
 */
export declare type BasicChartVisual = ChartVisual & Region & ShapeSet & Shape;
/**
 * The class implements the most part of logic general for point and line series
 * @hidden Internal class
 */
export declare abstract class BasicSeries<VisualType extends BasicChartVisual = BasicChartVisual, InputType extends Point = Point> extends SeriesXY<VisualType> {
    protected readonly _dataPattern: DataPattern;
    /**
     * @param engine                Drawing Engine
     * @param _chart                Parent Chart
     * @param _removeFromChart      Handler for removing reference to series from owning chart
     * @param xAxis                 Axis X
     * @param yAxis                 Axis Y
     * @param xAxisAttachHandler    Attach handler for Axis X
     * @param yAxisAttachHandler    Attach handler for Axis Y
     * @param _newUILayer           Factory for creating new UI layers for drawing SeriesMarkers
     * @param _dataPattern          Data-Pattern for enabling case-specific optimizations
     */
    constructor(engine: LayerXY, chart: ChartXY, _removeFromChart: RemoveHandler<SeriesXY>, _restoreFromChart: RestoreHandler<SeriesXY>, xAxis: Axis, yAxis: Axis, xAxisAttachHandler: AxisAttachHandler, yAxisAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _dataPattern: DataPattern);
    /**
     * Add point or array of points
     * @param    data    Point or array of points
     * @returns          Series itself for fluent interface
     */
    add(data: InputType | InputType[]): this;
    /**
     * Method for customizing contents of ResultTables when pointing at this Series.
     * @param   formatter   Function which builds ResultTable content.
     *                      See definition of SeriesXYFormatter for supplied formatting information.
     * @return              Object itself
     */
    setResultTableFormatter(formatter: SeriesXYFormatter): this;
    /**
     * Get ResultTable Formatter.
     * @return  Function which builds ResultTable content for SeriesXY.
     */
    getResultTableFormatter(): SeriesXYFormatter;
    /**
     * Set amount of points that should be kept around at all times (data-cleaning won't touch them).
     * NOTE: The actual data cleaning can only be started if there is at least 1 full segment (about 8000 points).
     * @param   maxPointCount   Guaranteed amount of visible points. If undefined or 0 is passed, data-cleaning will be disabled.
     * @returns                 Object itself
     */
    setMaxPointCount(maxPointCount: number | undefined): this;
    /**
     * Get amount of points that series should keep around at all times (data-cleaning won't touch them).
     * @return  Number of points, or undefined if data-cleaning is disabled
     */
    getMaxPointCount(): number | undefined;
    /**
     * Clear all points and segments from the dataset.
     * @returns         Series itself for fluent interface
     */
    clear(): this;
    /**
     * @return Max X value of the series
     */
    getXMax(): number | undefined;
    /**
     * @return Min X value of the series
     */
    getXMin(): number | undefined;
    /**
     * @return Max Y value of the series
     */
    getYMax(): number | undefined;
    /**
     * @return Min Y value of the series
     */
    getYMin(): number | undefined;
}
/**
 * Interface for a function which builds ResultTable content when pointing at a SeriesXY.
 * @param   tableContentBuilder     Builder that is used to build contents of ResultTable.
 *                                  Use addRow() method for adding content.
 * @param   series                  SeriesXY
 * @param   x                       X coordinate
 * @param   y                       Y coordinate
 * @return                          TableContentBuilder that was supplied
 */
export declare type SeriesXYFormatter = <T extends TableContentBuilder>(tableContentBuilder: T, series: SeriesXY, x: number, y: number) => T;
/**
 * Interface that can be used to define *ChartXY* configurations that can't be changed after creation. For example:
 *
 * - Specifying TickStrategies for default X or Y Axes'. This is mostly used for creating DateTime Axes.
 *
 * - Supplying a custom Builder for the AutoCursor of Chart. This can be used to modify the AutoCursor on a level,
 * which can't be done during runtime. For example, changing the shape of ResultTable Background, Etc.
 *
 * Example usage:
 *
 * | Desired result                                 | Value                                                                                                 |
 * | :--------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
 * | Default                                        | *undefined*                                                                                           |
 * | Default X Axis as DateTime                     | { **defaultAxisXTickStrategy:** *AxisTickStrategies*.DateTime() }                                     |
 * | Specified AutoCursor ResultTable Background    | { **autoCursorBuilder:** *AutoCursorBuilders*.XY.setResultTableBackground(*UIBackgrounds*.Circle) }   |
 */
export interface ChartXYOptions<CursorPointMarkerType extends PointMarker = PointMarker, CursorResultTableBackgroundType extends UIBackground = UIBackground, CursorTickMarkerBackgroundTypeX extends PointableBackground = PointableBackground, CursorTickMarkerBackgroundTypeY extends PointableBackground = PointableBackground> {
    /**
     * Builder for the Charts AutoCursor. If omitted, a default one will be used.
     * AutoCursorBuilders.XY can be used to build a custom one from scratch.
     */
    autoCursorBuilder?: AutoCursorXYBuilder<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerBackgroundTypeX, CursorTickMarkerBackgroundTypeY>;
    /**
     * TickStrategy for charts default X Axis that defines positioning and formating of its ticks.
     * See AxisTickStrategies for a collection of options.
     */
    defaultAxisXTickStrategy?: AxisTickStrategy;
    /**
     * TickStrategy for charts default Y Axis that defines positioning and formating of its ticks.
     * See AxisTickStrategies for a collection of options.
     */
    defaultAxisYTickStrategy?: AxisTickStrategy;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to.
 */
export interface SeriesOptions {
    /**
    * X Axis to attach the series to.
    */
    xAxis?: Axis;
    /**
    * Y Axis to attach the series to.
    */
    yAxis?: Axis;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to,
 * and define Shape for points of series.
 */
export interface PointSeriesOptions extends SeriesOptions {
    /**
     * PointShape Shape for points of series.
     */
    pointShape?: PointShape;
    /**
     * Optional property to enable optimizations for data that follows a certain pattern.
     *
     * See **DataPatterns** for a collection of options.
     * If the Series is supplied with data that does not respect the given *DataPattern*, it might behave unexpectedly.
     */
    dataPattern?: DataPatternConstructor;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to,
 * and define Shape for points of series.
 */
export interface SplineSeriesOptions extends SeriesOptions {
    /**
     * PointShape Shape for points of series.
     */
    pointShape?: PointShape;
    /**
     * Optional property to enable optimizations for data that follows a certain pattern.
     *
     * Supported *DataPattern*s:
     * - **DataPatterns**.horizontalProgressive
     * - **DataPatterns**.horizontalRegressive
     * - **DataPatterns**.freeform
     *
     * If the Series is supplied with data that does not respect the given *DataPattern*, it might behave unexpectedly.
     */
    dataPattern?: DataPatternConstructor<FreeFormPattern | HorizontalPattern>;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to,
 * and define Shape for points of series, indicate typeS of line step.
 */
export interface StepSeriesOptions extends SeriesOptions {
    /**
     * PointShape Shape for points of series.
     */
    pointShape?: PointShape;
    /**
     * Step behaviour for *StepSeries*.
     */
    mode?: StepOptions;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to,
 * and define type of dataPattern.
 */
export interface LineSeriesOptions extends SeriesOptions {
    /**
     * Optional property to enable optimizations for data that follows a certain pattern.
     *
     * See **DataPatterns** for a collection of options.
     * If the Series is supplied with data that does not respect the given *DataPattern*, it might behave unexpectedly.
     */
    dataPattern?: DataPatternConstructor;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to,
 * define type of StatisticFigure and type of dimensionStrategy.
 */
export interface BoxSeriesOptions<FigureType extends BoxFigure> extends SeriesOptions {
    /**
     * Figure type of StatisticFigure used for visualising segments.
     *
     * Currently only *BoxAndWhiskers* is implemented.
     */
    figure?: BoxFigureConstructor<FigureType>;
    /**
     * DimensionStrategy Strategy used for selecting between vertical and horizontal Box Series.
     */
    dimensionStrategy?: MultidimensionalStrategy;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to,
 * a reference number used for comparison and type of area series.
 */
export interface AreaSeriesOptions<T extends AreaSeriesTypes> extends SeriesOptions {
    /**
     * A fixed reference number.
     */
    baseline?: number;
    /**
     * Defines the type of area series. Selected option can enable/disable specific APIs!
     *
     * See **AreaSeriesTypes** for a collection of options.
     */
    type?: T;
}
/**
 * Interface can be used to define the X and Y Axis that a series should attach to,
 * type of OHLCFigure used for positive segments, negative segments and series.
 */
export interface OHLCSeriesOptions<PositiveFigure extends OHLCFigure, NegativeFigure extends OHLCFigure, OHLCSeriesType extends OHLCSeriesTypes<PositiveFigure, NegativeFigure>> extends SeriesOptions {
    /**
     * Type of OHLCFigure used for positive segments.
     */
    positiveFigure?: OHLCFigureConstructor<PositiveFigure>;
    /**
     * Type of OHLCFigure used for negative segments.
     */
    negativeFigure?: OHLCFigureConstructor<NegativeFigure>;
    /**
     * Type of OHLCSeries created.
     */
    seriesConstructor?: OHLCSeriesConstructor<PositiveFigure, NegativeFigure, OHLCSeriesType>;
}
/**
 * Chart for visualizing data using the *Cartesian coordinate system*, across any number of *Axes*.
 * It has a multitude of methods for adding various types of Series.
 *
 * *Charts* are created by methods of *LightningChart*-interface or a *Dashboard*.
 *
 * The *Axes* of a *ChartXY* can be manipulated with a variety of methods:
 *
 * | *Axis* operation                               | Method                            |
 * | :--------------------------------------------- | :-------------------------------- |
 * | Get automatically created *X Axis*             | *ChartXY*.**getDefaultAxisX()**   |
 * | Add a new *Y Axis* to right side of *ChartXY*  | *ChartXY*.**addAxisY(true)**      |
 * | Remove an *Axis*                               | *Axis*.**dispose()**              |
 */
export declare class ChartXY<CursorPointMarkerType extends PointMarker = PointMarker, CursorResultTableBackgroundType extends UIBackground = UIBackground, CursorTickMarkerBackgroundTypeX extends PointableBackground = PointableBackground, CursorTickMarkerBackgroundTypeY extends PointableBackground = PointableBackground> extends Chart2D<SeriesXY, CursorPointMarkerType, CursorResultTableBackgroundType, AutoCursorXY<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerBackgroundTypeX, CursorTickMarkerBackgroundTypeY>> {
    /**
     * @param layerSupplier     Rendering layer supplier
     * @param logoFactory       Flag for drawing LC logo
     * @param chartXYOptions    Settings union used to define ChartXY.
     * @param ScaleX            Injectable Scale constructor
     * @param ScaleY            Injectable Scale constructor
     * @param onScaleChange     Injectable subscribe method for when chart should update its positioning logic (used for dashboard)
     * @param margin            Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, logoFactory?: LogoFactory, chartXYOptions?: ChartXYOptions<CursorPointMarkerType, CursorResultTableBackgroundType, CursorTickMarkerBackgroundTypeX, CursorTickMarkerBackgroundTypeY>, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, margin?: number);
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Vec2 minimum size or undefined if unimplemented
     */
    getMinimumSize(): Point | undefined;
    /**
     * Create new XY Chart Marker to be rendered as part of UI.
     * @param   cursorBuilder   Optional StaticCursorBuilderXY to customize structure/style of chartMarker.
     *                          MarkerBuilders.XY can be used to build a custom one from scratch.
     * @param   axisX           Optional arbitrary X axis to attach ChartMarker on
     * @param   axisY           Optional arbitrary Y axis to attach ChartMarker on
     * @return                  Created ChartMarker
     */
    addChartMarkerXY<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, TickMarkerBackgroundTypeX extends PointableBackground = PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground = PointableBackground>(cursorBuilder?: StaticCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>, axisX?: Axis, axisY?: Axis): ChartMarkerXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>;
    /**
     * @param   addTop              Position of X axis. false = bottom, true = top
     * @param   axisTickStrategy    Custom tick strategy for axis that defines positioning and formating of its ticks.
     *                              See AxisTickStrategies for a collection of options.
     * @return                      Created Axis
     */
    addAxisX(addTop?: boolean, axisTickStrategy?: AxisTickStrategy): Axis;
    /**
     * @param   addRight            Position of Y axis. false = left, true = right
     * @param   axisTickStrategy    Custom tick strategy for axis that defines positioning and formating of its ticks.
     *                              See AxisTickStrategies for a collection of options.
     * @return                      Created Axis
     */
    addAxisY(addRight?: boolean, axisTickStrategy?: AxisTickStrategy): Axis;
    /**
     * @returns Primary X axis is the bottom one. If there is no bottom axis, the top one became default.
     */
    getDefaultAxisX(): Axis;
    /**
     * @returns Primary Y axis is the left one. If there is no left axis, the right one became default.
     */
    getDefaultAxisY(): Axis;
    /**
     * @param  axisPositions    array of axis positions which have to be included to the output
     *                          empty array indicates all of positions are included
     * @returns                 An array of axis
     */
    getAxes(...axisPositions: AxisPosition[]): Axis[];
    /**
     * Operate on each x axis of chart
     * @param   clbk    Callback function for axis
     */
    forEachAxisX(clbk: (axis: Axis, i: number, arr: Axis[]) => void): void;
    /**
     * Operate on each y axis of chart
     * @param   clbk    Callback function for axis
     */
    forEachAxisY(clbk: (axis: Axis, i: number, arr: Axis[]) => void): void;
    /**
     * Operate on each axis of chart, x and y
     * @param   clbk    Callback function for axis
     */
    forEachAxis(clbk: (axis: Axis, i: number, arr: Axis[]) => void): void;
    /**
     * Create Series for visualization of data by continuous lines.
     * @param options Options to attach series to axes and define the type of data pattern.
     *
     * @return                  LineSeries.
     */
    addLineSeries(options?: LineSeriesOptions): LineSeries;
    /**
     * Create Series for visualization of data by points.
     * @param   options Options to attach series to axes and define the shape for points of series.
     * @return              Created series.
     */
    addPointSeries(options?: PointSeriesOptions): PointSeries;
    /**
     * Create Plot for visualization of data by points and lines
     * @param   options Options to attach series to axes and define the shape for points of series.
     * @return              Created plot
     */
    addPointLineSeries(options?: PointSeriesOptions): PointLineSeries;
    /**
     * Create Series for visualization of data by points and lines. Apply steps to the line curve.
     * @param   options Options to attach series to axes and define the shape for points of series,
     *                            step behaviour for *StepSeries*.
     *                      Possible values are 'before', 'middle' and 'after', defaults to StepOptions.before.
     * @return              Created series
     */
    addStepSeries(options?: StepSeriesOptions): StepSeries;
    /**
     * Create Series for visualization of data by points and lines, where the segments between the data points are smoothed.
     * @param   options Options to attach series to axes and define the shape for points of series.
     * @return              Created series
     */
    addSplineSeries(options?: SplineSeriesOptions): SplineSeries;
    /**
     * Create Series for drawing rectangles.
     * @param      options Options to attach series to axes.
     * @return     Created series
     */
    addRectangleSeries(options?: SeriesOptions): RectangleSeries;
    /**
     * Create Series for visualization of data by individual line-segments
     * @param      options Options to attach series to axes.
     * @return                           Created series
     */
    addSegmentSeries(options?: SeriesOptions): SegmentSeries;
    /**
     * Create Series for drawing ellipses.
     * @param      options Options to attach series to axes.
     * @return           Created series
     */
    addEllipseSeries(options?: SeriesOptions): EllipseSeries;
    /**
     * Create Series for visualization of OHLC segments.
     * @param options    Options to attach series to axes,
     *                   define type of OHLCFigure used for positive segments, negative segments and series.
     * @return           Created OHLCSeries whose interface is related to value of 'seriesConstructor' parameter
     */
    addOHLCSeries<PositiveFigure extends OHLCFigure = OHLCCandleStick, NegativeFigure extends OHLCFigure = PositiveFigure, OHLCSeriesType extends OHLCSeriesTypes<PositiveFigure, NegativeFigure> = OHLCSeriesTraditional<PositiveFigure, NegativeFigure>>(options?: OHLCSeriesOptions<PositiveFigure, NegativeFigure, OHLCSeriesType>): OHLCSeriesType;
    /**
     * Create Series for visualization of data with quartiles.
     * @param options Options to attach series to axes, type of StatisticFigure and type of dimensionStrategy.
     * @return                  Created series
     */
    addBoxSeries<FigureType extends BoxFigure = BoxAndWhiskers>(options?: BoxSeriesOptions<FigureType>): BoxSeries<FigureType>;
    /**
     * Creates area series for visualization of data between the given line and base line limit.
     * @param options Options to attach series to axes, a number for comparisons and defines the type of area series.
     * @return          Created series
     */
    addAreaSeries: <T extends typeof AreaSeriesPositive | typeof AreaSeriesNegative | typeof AreaSeriesBipolar = typeof AreaSeriesPositive>(options?: AreaSeriesOptions<T> | undefined) => InstanceType<T>;
    /**
     * Creates range area series for visualization bands of data between the two given lines.
     * Each point in the chart is specified by two y values.
     * @param      options Options to attach series to axes.
     * @return               Created series
     */
    addAreaRangeSeries: (options?: SeriesOptions | undefined) => AreaRangeSeries;
    /**
     * Set mouse style when hovering over chart background.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setMouseBackgroundStyle(mouseStyle?: string): this;
    /**
     * Set mouse style when zooming over chart background.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setMouseZoomStyle(mouseStyle?: string): this;
    /**
     * Set mouse style when fitting over chart background.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setMouseFitStyle(mouseStyle?: string): this;
    /**
     * Set mouse style when panning over chart background.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setMousePanStyle(mouseStyle?: string): this;
    /**
     * Set all mouse-interaction flags at once.
     * @param   enabled     Are mouse-interactions enabled
     * @return              Object itself
     */
    setMouseInteractions(enabled: boolean): this;
    /**
     * Set is mouse-interaction enabled:
     * Zooming axes by capturing rectangle on frame.
     * @param   enabled     Boolean flag
     * @return              Object itself
     */
    setMouseInteractionRectangleZoom(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Zooming axes by capturing rectangle on frame.
     * @return  Boolean flag
     */
    getMouseInteractionRectangleZoom(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Fitting axes by capturing rectangle on frame.
     * @param   enabled     Boolean flag
     * @return              Object itself
     */
    setMouseInteractionRectangleFit(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Fitting axes by capturing rectangle on frame.
     * @return  Boolean flag
     */
    getMouseInteractionRectangleFit(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Panning axes by dragging mouse on frame.
     * @param   enabled     Boolean flag
     * @return              Object itself
     */
    setMouseInteractionPan(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Panning axes by dragging mouse on frame.
     * @return  Boolean flag
     */
    getMouseInteractionPan(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Zooming axes with mouse-wheel on frame (also touch pinch currently).
     * @param   enabled     Boolean flag
     * @return              Object itself
     */
    setMouseInteractionWheelZoom(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Zooming axes with mouse-wheel on frame.
     * @return  Boolean flag
     */
    getMouseInteractionWheelZoom(): boolean;
    /**
     * Set fillStyle for zooming rectangle when zooming.
     * @param   value   FillStyle or mutator to modify existing one
     * @return          Object itself
     */
    setZoomingRectangleFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fillStyle for zooming rectangle when zooming.
     * @return  FillStyle
     */
    getZoomingRectangleFillStyle(): FillStyle;
    /**
     * Set stroke style for zooming rectangle when zooming.
     * @param   value   LineStyle or mutator to modify existing one
     * @return          Object itself
     */
    setZoomingRectangleStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style for zooming rectangle when zooming.
     * @return  LineStyle
     */
    getZoomingRectangleStrokeStyle(): LineStyle;
    /**
     * Set fillStyle for zooming rectangle when fitting.
     * @param   value       FillStyle or mutator to modify existing one
     * @return              Object itself
     */
    setFittingRectangleFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fillStyle for fitting rectangle when fitting.
     * @return  FillStyle
     */
    getFittingRectangleFillStyle(): FillStyle;
    /**
     * Set stroke style for zooming rectangle when fitting.
     * @param   value       LineStyle or mutator to modify existing one
     * @return              Object itself
     */
    setFittingRectangleStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style for fitting rectangle when fitting.
     * @return  LineStyle
     */
    getFittingRectangleStrokeStyle(): LineStyle;
    /**
     * Get if mouse and cursor interactions are disabled during zooming animations for the chart's series.
     * @return True if interactions with series are disabled, false if not.
     */
    getMouseInteractionsWhileZooming(): boolean;
    /**
     * Set if mouse and cursor interactions should be disabled during zooming animations for the chart's series.
     * @param   state   True if mouse and cursor interactions should be disabled during zooming animations, false if not.
     * @return          Chart itself for fluent interface.
     */
    setMouseInteractionsWhileZooming(state: boolean): this;
}
/**
 * Axis positioning Enum
 * @hidden
 */
export declare enum AxisPosition {
    Top = 0,
    Bottom = 1,
    Left = 2,
    Right = 3
}
/**
 * Type of Axis attach handler.
 * Essentially this is a more advanced Restore-handler, for handling case with 3-way-dispose/restore-relationship (chart,axis,series).
 * TODO: Should be unified with rest of dispose/restore system somehow.
 * @hidden
 */
export declare type AxisAttachHandler = (series: SeriesXY) => ((series: SeriesXY) => void);
/**
 * A type of Cursor that is plotted along two axes.
 * Adds customizable gridStrokes and tickMarkers
 */
export interface CursorXY<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, TickMarkerBackgroundTypeX extends PointableBackground = PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground = PointableBackground> extends Cursor<PointMarkerType, ResultTableBackgroundType> {
    /**
     * Set is GridStrokeX cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeXCut: (cut: boolean) => this;
    /**
     * Get is GridStrokeX cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeXCut: () => boolean;
    /**
     * Set is GridStrokeY cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYCut: (cut: boolean) => this;
    /**
     * Get is GridStrokeY cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeYCut: () => boolean;
    /**
     * Set style of x gridstroke
     * @param   value      LineStyle object
     * @returns            Object itself for fluent interface
     */
    setGridStrokeXStyle: (value: LineStyle | ImmutableMutator<LineStyle>) => this;
    /**
     * Get style of x gridstroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeXStyle: () => LineStyle;
    /**
     * Set style of y gridstroke
     * @param   value       LineStyle object
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYStyle: (value: LineStyle | ImmutableMutator<LineStyle>) => this;
    /**
     * Get style of y gridstroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeYStyle: () => LineStyle;
    /**
     * Set TickMarkerX.
     * @param   mutator     Mutator function for cursors X tickMarker
     * @return              Object itself for fluent interface
     */
    setTickMarkerX: (mutator: Mutator<TickMarker<TickMarkerBackgroundTypeX>>) => this;
    /**
     * Set TickMarkerY.
     * @param   mutator     Mutator function for cursors Y tickMarker
     * @return              Object itself for fluent interface
     */
    setTickMarkerY: (mutator: Mutator<TickMarker<TickMarkerBackgroundTypeY>>) => this;
    /**
     * Dispose TickMarker part of Y CustomTick
     * @return Object itself for fluent interface
     */
    disposeTickMarkerY(): this;
    /**
     * Restore TickMarker part of Y CustomTick
     * @return Object itself for fluent interface
     */
    restoreTickMarkerY(): this;
    /**
     * @return Whether TickMarker part of Y CustomTick is disposed
     */
    isDisposedTickMarkerY(): boolean;
    /**
     * Dispose TickMarker part of X CustomTick
     * @return Object itself for fluent interface
     */
    disposeTickMarkerX(): this;
    /**
     * Restore TickMarker part of X CustomTick
     * @return Object itself for fluent interface
     */
    restoreTickMarkerX(): this;
    /**
     * @return Whether TickMarker part of X CustomTick is disposed
     */
    isDisposedTickMarkerX(): boolean;
}
/**
 * A type of CursorXY that can be plotted dynamically between different axes.
 */
export interface AutoCursorXY<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, TickMarkerBackgroundTypeX extends PointableBackground = PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground = PointableBackground> extends CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>, AutoCursor<PointMarkerType, ResultTableBackgroundType> {
    /**
     * Set is TickMarkerX auto text fill style enabled.
     * When enabled, text of TickMarkerX will be automatically filled based on pointed data.
     * @param   enabled     Boolean flag
     * @return              Object itself
     * @sideEffect          When enabled, any fill style set operation on TickMarkerX might get overridden
     */
    setTickMarkerXAutoTextStyle(enabled: boolean): this;
    /**
     * Get is TickMarkerX auto text fill style enabled.
     * When enabled, text of TickMarkerX will be automatically filled based on pointed data.
     * @return              Boolean flag
     */
    getTickMarkerXAutoTextStyle(): boolean;
    /**
     * Set is TickMarkerY auto text fill style enabled.
     * When enabled, text of TickMarkerY will be automatically filled based on pointed data.
     * @param   enabled     Boolean flag
     * @return              Object itself
     * @sideEffect          When enabled, any fill style set operation on TickMarkerY might get overridden
     */
    setTickMarkerYAutoTextStyle(enabled: boolean): this;
    /**
     * Get is TickMarkerY auto text fill style enabled.
     * When enabled, text of TickMarkerY will be automatically filled based on pointed data.
     * @return              Boolean flag
     */
    getTickMarkerYAutoTextStyle(): boolean;
}
/**
 * Static XY cursor interface
 */
export interface StaticCursorXY<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, TickMarkerBackgroundTypeX extends PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground> extends StaticCursor<PointMarkerType, ResultTableBackgroundType>, CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY> {
    /**
     * Get x tick marker
     * @returns             X customTick of cursor
     */
    getTickMarkerX: () => TickMarker<TickMarkerBackgroundTypeX>;
    /**
     * Get y tick marker
     * @returns             Y customTick of cursor
     */
    getTickMarkerY: () => TickMarker<TickMarkerBackgroundTypeY>;
}
/**
 * Internal class for static xy cursors.
 * Static cursors are attached to a pair of axes on creation
 * and don't move from there.
 * @hidden Internal class
 */
export declare class InternalStaticCursorXY<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, TickMarkerBackgroundTypeX extends PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground> extends InternalStaticCursor<PointMarkerType, ResultTableBackgroundType> implements CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>, StaticCursor<PointMarkerType, ResultTableBackgroundType> {
    /**
     * Points the Cursor at a given CursorPoint.
     * Updating its position and displayed data.
     */
    pointAt(cursorPoint: CursorPoint): this;
    /**
     * Set the position of the Cursor,
     * moving it without modifying displayed data.
     */
    setPosition(position: Point): this;
    /**
     * Dispose of the cursor and its custom ticks.
     */
    dispose(): this;
    /**
     * Dispose of the cursor and its custom ticks.
     */
    restore(): this;
    /**
     * Set is GridStrokeX cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeXCut(cut: boolean): this;
    /**
     * Get is GridStrokeX cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeXCut(): boolean;
    /**
     * Set is GridStrokeY cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYCut(cut: boolean): this;
    /**
     * Get is GridStrokeY cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeYCut(): boolean;
    /**
     * Set style of x gridstroke
     * @param   value       LineStyle object
     * @returns             Object itself for fluent interface
     */
    setGridStrokeXStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of x gridstroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeXStyle(): LineStyle;
    /**
     * Set style of y gridstroke
     * @param   value       LineStyle object
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYStyle: (value: LineStyle | ImmutableMutator<LineStyle, LineStyle>) => this;
    /**
     * Get style of y gridstroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeYStyle: () => LineStyle;
    /**
     * Dispose TickMarker part of X CustomTick
     * @return Object itself for fluent interface
     */
    disposeTickMarkerX(): this;
    /**
     * Restore TickMarker part of X CustomTick
     * @return Object itself for fluent interface
     */
    restoreTickMarkerX(): this;
    /**
     * @return Whether TickMarker part of X CustomTick is disposed
     */
    isDisposedTickMarkerX(): boolean;
    /**
     * Dispose TickMarker part of Y CustomTick
     * @return Object itself for fluent interface
     */
    disposeTickMarkerY(): this;
    /**
     * Restore TickMarker part of Y CustomTick
     * @return Object itself for fluent interface
     */
    restoreTickMarkerY(): this;
    /**
     * @return Whether TickMarker part of Y CustomTick is disposed
     */
    isDisposedTickMarkerY(): boolean;
    /**
     * Mutator function for x tick marker
     * @param   mutator     TickMarker mutator function
     * @returns             Object itself for fluent interface
     */
    setTickMarkerX(mutator: Mutator<TickMarker<TickMarkerBackgroundTypeX & InternalBackground>>): this;
    /**
     * Mutator function for y tick marker
     * @param   mutator     TickMarker mutator function
     * @returns              Object itself for fluent interface
     */
    setTickMarkerY(mutator: Mutator<TickMarker<TickMarkerBackgroundTypeY & InternalBackground>>): this;
    /**
     * Get x tick marker
     * @returns             X customTick of cursor
     */
    getTickMarkerX(): TickMarker<TickMarkerBackgroundTypeX>;
    /**
     * Get y tick marker
     * @returns             Y customTick of cursor
     */
    getTickMarkerY(): TickMarker<TickMarkerBackgroundTypeY>;
}
/**
 * Internal class for dynamic xy cursors.
 * Dynamic cursors can be positioned to any pair of axes at any time.
 * @hidden Internal class
 */
export declare class InternalAutoCursorXY<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, TickMarkerBackgroundTypeX extends PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground> extends InternalAutoCursor<PointMarkerType, ResultTableBackgroundType> implements CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>, AutoCursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY> {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    protected _pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>;
    protected _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>;
    protected _tickMarkerXBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeX & InternalBackground>;
    protected _tickMarkerYBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeY & InternalBackground>;
    /**
     * @param _layer                             Top layer of the rendering Engine
     * @param scale                              Rendering scale of cursor. For dynamic cursor this is naturally not based on any axis
     * @param _pointMarkerConstructor            Constructor for PointMarker
     * @param _resultTableBackgroundConstructor  Constructor for Background of ResultTable
     * @param _tickMarkerXBuilder                Builder for TickMarkerX
     * @param _tickMarkerYBuilder                Builder for TickMarkerY
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>, _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>, _tickMarkerXBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeX & InternalBackground>, _tickMarkerYBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeY & InternalBackground>);
    /**
     * Tell the cursor to restore of its ticks.
     */
    restore(): this;
    /**
     * Tell the cursor to dispose of its ticks.
     */
    dispose(): this;
    /**
     * Points the Cursor at a given CursorPoint.
     * Updating its position and displayed data.
     */
    pointAt(cursorPoint: CursorPoint<SeriesXY>): this;
    /**
     * Set is GridStrokeX cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeXCut(cut: boolean): this;
    /**
     * Get is GridStrokeX cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeXCut(): boolean;
    /**
     * Set is GridStrokeY cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYCut(cut: boolean): this;
    /**
     * Get is GridStrokeY cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeYCut(): boolean;
    /**
     * Set style of x gridstroke
     * @param   value       LineStyle object
     * @returns             Object itself for fluent interface
     */
    setGridStrokeXStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of x gridstroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeXStyle(): LineStyle;
    /**
     * Set lineStyle of y gridstroke
     * @param   lineStyle   LineStyle object
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYStyle(lineStyle: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of y gridstroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeYStyle(): LineStyle;
    /**
     * Dispose TickMarker part of X CustomTick
     * @return Object itself for fluent interface
     */
    disposeTickMarkerX(): this;
    /**
     * Restore TickMarker part of X CustomTick
     * @return Object itself for fluent interface
     */
    restoreTickMarkerX(): this;
    /**
     * @return Whether TickMarker part of X CustomTick is disposed
     */
    isDisposedTickMarkerX(): boolean;
    /**
     * Dispose TickMarker part of Y CustomTick
     * @return Object itself for fluent interface
     */
    disposeTickMarkerY(): this;
    /**
     * Restore TickMarker part of Y CustomTick
     * @return Object itself for fluent interface
     */
    restoreTickMarkerY(): this;
    /**
     * @return Whether TickMarker part of Y CustomTick is disposed
     */
    isDisposedTickMarkerY(): boolean;
    /**
     * Mutator function for x tick marker.
     * Applies function to current tick marker if it exists and for any newly created
     * tick marker in order of adding.
     * @param   mutator     Mutator function for TickMarker
     * @return              Object itself
     * @sideEffect          Method can't currently be implemented in a clean way so its usage currently will consume unneeded memory.
     *                      It's repeative usage should be avoided for now.
     */
    setTickMarkerX(mutator: Mutator<TickMarker<TickMarkerBackgroundTypeX & InternalBackground>>): this;
    /**
     * Mutator function for y tick marker.
     * Applies function to current tick marker if it exists and for any newly created
     * tick marker in order of adding.
     * @param   mutator     Mutator function for TickMarker
     * @return              Object itself
     * @sideEffect          Method can't currently be implemented in a clean way so its usage currently will consume unneeded memory.
     *                      It's repeative usage should be avoided for now.
     */
    setTickMarkerY(mutator: Mutator<TickMarker<TickMarkerBackgroundTypeY & InternalBackground>>): this;
    /**
     * Set is TickMarkerX auto text fill style enabled.
     * When enabled, text of TickMarkerX will be automatically filled based on pointed data.
     * @param   enabled     Boolean flag
     * @return              Object itself
     * @sideEffect          When enabled, any fill style set operation on TickMarkerX might get overridden
     */
    setTickMarkerXAutoTextStyle(enabled: boolean): this;
    /**
     * Get is TickMarkerX auto text fill style enabled.
     * When enabled, text of TickMarkerX will be automatically filled based on pointed data.
     * @return              Boolean flag
     */
    getTickMarkerXAutoTextStyle(): boolean;
    /**
     * Set is TickMarkerY auto text fill style enabled.
     * When enabled, text of TickMarkerY will be automatically filled based on pointed data.
     * @param   enabled     Boolean flag
     * @return              Object itself
     * @sideEffect          When enabled, any fill style set operation on TickMarkerY might get overridden
     */
    setTickMarkerYAutoTextStyle(enabled: boolean): this;
    /**
     * Get is TickMarkerY auto text fill style enabled.
     * When enabled, text of TickMarkerY will be automatically filled based on pointed data.
     * @return              Boolean flag
     */
    getTickMarkerYAutoTextStyle(): boolean;
}
/**
 * Base class for cursorXY builders
 */
export declare abstract class CursorBuilderXY<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, TickMarkerBackgroundTypeX extends PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground, CursorType extends CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>> extends CursorBuilder<PointMarkerType, ResultTableBackgroundType, CursorType> {
    protected _pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>;
    protected _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>;
    protected _tickMarkerXBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeX & InternalBackground>;
    protected _tickMarkerYBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeY & InternalBackground>;
    protected _stylers: CursorStyler<CursorType>[];
    /**
     * @param _pointMarkerConstructor            Constructor for PointMarker
     * @param _resultTableBackgroundConstructor  Constructor for Background of ResultTable
     * @param _tickMarkerXBuilder                Builder for TickMarkerX
     * @param _tickMarkerYBuilder                Builder for TickMarkerY
     * @param _stylers                           List of stylers
     * @hidden
     */
    constructor(_pointMarkerConstructor: PointMarkerConstructor<PointMarkerType & InternalPointMarker>, _resultTableBackgroundConstructor: BackgroundConstructor<ResultTableBackgroundType & InternalBackground>, _tickMarkerXBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeX & InternalBackground>, _tickMarkerYBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundTypeY & InternalBackground>, _stylers: CursorStyler<CursorType>[]);
    /**
     * Create new CursorBuilder with a different TickMarkerX Background.
     * @param   tickMarkerXBackgroundConstructor    Constructor for TickMarker Background
     * @returns                                     CursorBuilder of same type
     */
    abstract setTickMarkerXBackground: <T extends TickMarkerBackgroundTypeX & InternalBackground>(tickMarkerXBackgroundConstructor: PointableBackgroundConstructor<T>) => CursorBuilderXY<PointMarkerType, ResultTableBackgroundType, T, TickMarkerBackgroundTypeY, CursorXY<PointMarkerType, ResultTableBackgroundType, T, TickMarkerBackgroundTypeY>>;
    /**
     * Create new CursorBuilder with a different TickMarkerY Background.
     * @param   tickMarkerYBackgroundConstructor    Constructor for TickMarker Background
     * @returns                                     CursorBuilder of same type
     */
    abstract setTickMarkerYBackground: <T extends TickMarkerBackgroundTypeY & InternalBackground>(tickMarkerYBackgroundConstructor: PointableBackgroundConstructor<T>) => CursorBuilderXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, T, CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, T>>;
}
/**
 * Builder for *AutoCursor* of *ChartXY*.
 *
 * Used to modify structure of *AutoCursor*, by passing one when creating a *ChartXY*.
 * Reference from **AutoCursorBuilders.XY**
 */
export declare class AutoCursorXYBuilder<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, TickMarkerXBackgroundType extends PointableBackground = PointableBackground, TickMarkerYBackgroundType extends PointableBackground = PointableBackground> extends CursorBuilderXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType, AutoCursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>> implements AutoCursorBuilder<CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>> {
    /**
     * Create new CursorBuilder with an additional styler.
     * @param   cursorStyler    Cursor styler function
     * @returns                 New builder with extended style
     */
    addStyler: (cursorStyler: Mutator<AutoCursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>>) => AutoCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different PointMarker.
     * @param   pointMarkerConstructor  Constructor for PointMarker
     * @returns                         New builder with different pointMarker
     */
    setPointMarker: <T extends UIElement & PointMarker & PointMarkerType>(pointMarkerConstructor: PointMarkerConstructor<T>) => AutoCursorXYBuilder<T, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different ResultTable Background.
     * @param   resultTableBackground   Constructor for Background
     * @returns                         New builder with different resultTable background
     */
    setResultTableBackground: <T extends InternalBackground & ResultTableBackgroundType>(resultTableBackground: BackgroundConstructor<T>) => AutoCursorXYBuilder<PointMarkerType, T, TickMarkerXBackgroundType, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different TickMarkerX Background.
     * @param   tickMarkerXBackgroundConstructor    Constructor for TickMarker Background
     * @returns                                     New builder with different tickMarkerX background
     */
    setTickMarkerXBackground: <T extends InternalBackground & TickMarkerXBackgroundType>(tickMarkerXBackgroundConstructor: PointableBackgroundConstructor<T>) => AutoCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, T, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different TickMarkerY Background.
     * @param   tickMarkerYBackgroundConstructor    Constructor for TickMarker Background
     * @returns                                     New builder with different tickMarkerY background
     */
    setTickMarkerYBackground: <T extends InternalBackground & TickMarkerYBackgroundType>(tickMarkerYBackgroundConstructor: PointableBackgroundConstructor<T>) => AutoCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, T>;
}
/**
 * Builder for static xy-cursors
 */
export declare class StaticCursorXYBuilder<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, TickMarkerXBackgroundType extends PointableBackground = PointableBackground, TickMarkerYBackgroundType extends PointableBackground = PointableBackground> extends CursorBuilderXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType, StaticCursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>> {
    /**
     * Create new CursorBuilder with an additional styler.
     * @param   cursorStyler    Cursor styler function
     * @returns                 New builder with extended style
     */
    addStyler: (cursorStyler: Mutator<StaticCursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>>) => StaticCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different PointMarker.
     * @param   pointMarkerConstructor  Constructor for PointMarker
     * @returns                         New builder with different pointMarker
     */
    setPointMarker: <T extends UIElement & PointMarker & PointMarkerType>(pointMarkerConstructor: PointMarkerConstructor<T>) => StaticCursorXYBuilder<T, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different ResultTable Background.
     * @param   resultTableBackgroundConstructor    Constructor for Background
     * @returns                                     New builder with different resultTable background
     */
    setResultTableBackground: <T extends InternalBackground & ResultTableBackgroundType>(resultTableBackgroundConstructor: BackgroundConstructor<T>) => StaticCursorXYBuilder<PointMarkerType, T, TickMarkerXBackgroundType, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different TickMarkerX Background.
     * @param   tickMarkerXBackgroundConstructor    Constructor for TickMarker Background
     * @returns                                     New builder with different tickMarkerX background
     */
    setTickMarkerXBackground: <T extends InternalBackground & TickMarkerXBackgroundType>(tickMarkerXBackgroundConstructor: PointableBackgroundConstructor<T>) => StaticCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, T, TickMarkerYBackgroundType>;
    /**
     * Create new CursorBuilder with a different TickMarkerY Background.
     * @param   tickMarkerYBackgroundConstructor    Constructor for TickMarker Background
     * @returns                                     New builder with different tickMarkerY background
     */
    setTickMarkerYBackground: <T extends InternalBackground & TickMarkerYBackgroundType>(tickMarkerYBackgroundConstructor: PointableBackgroundConstructor<T>) => StaticCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, T>;
}
/**
 * Interface for an object that can be used to enable optimizations applicable only to data that follows a specific pattern.
 */
export interface DataPattern {
    /**
     * @return Max X value of the series
     */
    getXMax<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min X value of the series
     */
    getXMin<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Max Y value of the series
     */
    getYMax<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min Y value of the series
     */
    getYMin<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * Base class for Freeform series
 */
export declare class FreeFormPattern implements DataPattern {
    /**
     * @return Max X value of the series
     */
    getXMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min X value of the series
     */
    getXMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Max Y value of the series
     */
    getYMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min Y value of the series
     */
    getYMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 *  Base class for ProgressivePattern series
 */
export declare abstract class ProgressivePattern implements DataPattern {
    /**
     * @return Max X value of the series
     */
    abstract getXMax<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min X value of the series
     */
    abstract getXMin<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Max Y value of the series
     */
    abstract getYMax<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min Y value of the series
     */
    abstract getYMin<VisualType extends BasicChartVisual>(segments: VisualType[], newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * Abstract class which contains a part of logic which is generic for Horizontal progressive and regressive Line Series
 *
 * Y Max and Min are found by iteration over entire collection of segments
 * @hidden
 */
export declare abstract class HorizontalPattern extends ProgressivePattern {
    /**
     * @return Max Y value of the series
     */
    getYMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min Y value of the series
     */
    getYMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * DataPattern for horizontally progressive data
 * @hidden
 */
export declare class HorizontalProgressivePattern extends HorizontalPattern {
    /**
     * @return Max X value of the series
     */
    getXMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min X value of the series
     */
    getXMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * DataPattern for horizontally regressive data
 * @hidden
 */
export declare class HorizontalRegressivePattern extends HorizontalPattern {
    /**
     * @return Max X value of the series
     */
    getXMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min X value of the series
     */
    getXMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * Abstract class which contains a part of logic which is generic for Vertical progressive and regressive Line Series
 *
 * X Max and Min are found by iteration over entire collection of segments
 * @hidden
 */
export declare abstract class VerticalPattern extends ProgressivePattern {
    /**
     * @return Max X value of the series
     */
    getXMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min X value of the series
     */
    getXMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * DataPattern for vertically progressive data
 * @hidden
 */
export declare class VerticalProgressivePattern extends VerticalPattern {
    /**
     * @return Max Y value of the series
     */
    getYMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min Y value of the series
     */
    getYMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * DataPattern for vertically regressive data
 * @hidden
 */
export declare class VerticalRegressivePattern extends VerticalPattern {
    /**
     * @return Max Y value of the series
     */
    getYMax<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
    /**
     * @return Min Y value of the series
     */
    getYMin<VisualType extends BasicChartVisual>(segments: VisualType[] | undefined, newPointsBound: Interval<Point> | undefined): number | undefined;
}
/**
 * Options collection for selecting optimizations for data with a specific pattern.
 * Knowing the pattern of incoming data can enable massive optimizations.
 *
 * This must be specified when *Series* is created. Note, that not all *Series* support specifying pattern of data.
 *
 * Example usage:
 *
 * | Desired result                                 | Usage                                                                                 |
 * | :--------------------------------------------- | :------------------------------------------------------------------------------------ |
 * | Create *LineSeries* with progressive data on X | *ChartXY*.addLineSeries({ **dataPattern:** *DataPatterns*.HorizontalProgressivePattern }) |
 *
 * If the Series is supplied with data that does not respect the given *DataPattern*, it might behave unexpectedly.
 */
export declare const DataPatterns: {
    /**
     * Indicates that incoming data always progresses in positive X direction and enables optimizations for this scenario.
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                                 |
     * | :--------------------------------------------- | :------------------------------------------------------------------------------------ |
     * | Create *LineSeries* with progressive data on X | *ChartXY*.addLineSeries({ **dataPattern:** *DataPatterns*.horizontalProgressive }) |
     */
    horizontalProgressive: typeof HorizontalProgressivePattern;
    /**
     * Indicates that incoming data always progresses in negative X direction and enables optimizations for this scenario.
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                                 |
     * | :--------------------------------------------- | :------------------------------------------------------------------------------------ |
     * | Create *LineSeries* with regressive data on X  | *ChartXY*.addLineSeries({ **dataPattern:** *DataPatterns*.horizontalRegressive })  |
     */
    horizontalRegressive: typeof HorizontalRegressivePattern;
    /**
     * Indicates that incoming data always progresses in positive Y direction and enables optimizations for this scenario.
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                                 |
     * | :--------------------------------------------- | :------------------------------------------------------------------------------------ |
     * | Create *LineSeries* with progressive data on Y | *ChartXY*.addLineSeries({ **dataPattern:** *DataPatterns*.verticalProgressive })   |
     */
    verticalProgressive: typeof VerticalProgressivePattern;
    /**
     * Indicates that incoming data always progresses in negative Y direction and enables optimizations for this scenario.
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                                 |
     * | :--------------------------------------------- | :------------------------------------------------------------------------------------ |
     * | Create *LineSeries* with regressive data on Y  | *ChartXY*.addLineSeries({ **dataPattern:** *DataPatterns*.verticalRegressive })    |
     */
    verticalRegressive: typeof VerticalRegressivePattern;
    /**
     * Indicates that incoming data has no pattern, and can go in any direction from any given point.
     * Data-point solving is EXTREMELY HEAVY for freeform data, consider using other *DataPattern*s if possible.
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                                 |
     * | :--------------------------------------------- | :------------------------------------------------------------------------------------ |
     * | Create *freeform* *LineSeries*                 | *ChartXY*.addLineSeries({ **dataPattern:** *DataPatterns*.freeform })              |
     */
    freeform: typeof FreeFormPattern;
};
/**
 * Type of constructor for DataPattern
 * @hidden
 */
export declare type DataPatternConstructor<T extends DataPattern = DataPattern> = new () => T;
/**
 * LineSeries, extension of BasicSeries using LineSets
 * + Lined -interface
 */
/**
 * Implementation of *SeriesXY* for visualizing a collection of *Points* with connected lines.
 *
 * *LineSeries* are created with *ChartXY*.**addLineSeries()**
 */
export declare class LineSeries extends BasicSeries<LineSet, Point> implements Lined {
    /**
     * Set stroke style of Series.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide Series use dispose() method                        |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @returns         Chart itself
     */
    setStrokeStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Get stroke style of Series.
     * @return  SolidLine object
     */
    getStrokeStyle(): SolidLine;
    /**
     * Set stroke style of Series when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted Series use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to modify current value or
     *                  undefined for automatic value based on normal style.
     * @returns         Chart itself
     */
    setStrokeStyleHighlight(value: SolidLine | ImmutableMutator<SolidLine> | undefined): this;
    /**
     * Get stroke style of Series when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     * @return  SolidLine object
     */
    getStrokeStyleHighlight(): SolidLine;
    /**
     * Set if cursor interpolates solved data-points along series by default.
     * @param   state   Boolean flag
     * @returns         Object itself for fluent interface
     */
    setCursorInterpolationEnabled(state: boolean): this;
    /**
     * Get if cursor interpolates solved data-points along series by default.
     * @returns         Boolean flag
     */
    getCursorInterpolationEnabled(): boolean;
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Solves the nearest datapoint to a given coordinate on screen.
     * @param   location    Location on screen
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromScreen(location: Point, interpolate?: boolean): undefined | CursorPoint;
    /**
     * Solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: LineSet, interpolate?: boolean): undefined | CursorPoint;
}
/**
 * Interface for a series which contains lines
 * @hidden
 */
export interface Lined {
    /**
     * Set lines style
     * @param   value     Line style object or function which modifies it
     * @returns           Series object (self)
     */
    setStrokeStyle: (value: SolidLine | ImmutableMutator<SolidLine>) => this;
    /**
     * @return Current lines style
     */
    getStrokeStyle: () => SolidLine;
    /**
     * Set highlight line style
     * @param   lineStyle  SolidLine for highlighted line or mutator to modify existing one or undefined for auto
     * @return             Object itself for fluent interface
     */
    setStrokeStyleHighlight: (lineStyle: SolidLine | ImmutableMutator<SolidLine> | undefined) => this;
    /**
     * @return  Current highlight line style
     */
    getStrokeStyleHighlight: () => SolidLine | undefined;
}
/**
 * Cursor-based visual that can be plotted on a XY Chart.
 * Like CursorXYs its built of four parts:
 * PointMarker shows the location of the Marker,
 * ResultTable displays information of the point
 * and X&Y tickMarkers to show gridstroke on its axes.
 * @hidden
 */
export interface MarkerXY<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, TickMarkerBackgroundTypeX extends PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground> extends Marker<PointMarkerType, ResultTableBackgroundType, CursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>> {
    /**
     * Set visibility mode for gridstroke X.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setGridStrokeXVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for gridstroke X.
     * @return                  VisibilityMode
     */
    getGridStrokeXVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for gridstroke Y.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setGridStrokeYVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for gridstroke Y.
     * @return                  VisibilityMode
     */
    getGridStrokeYVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for tickMarker X.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setTickMarkerXVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for tickMarker X.
     * @return                  VisibilityMode
     */
    getTickMarkerXVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for tickMarker Y.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setTickMarkerYVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for tickMarker Y.
     * @return                  VisibilityMode
     */
    getTickMarkerYVisibility(): UIVisibilityModes;
}
/**
 * XY Marker that is basically a static cursor.
 * @hidden Internal class
 */
declare abstract class InternalChartMarkerXY<PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, TickMarkerBackgroundTypeX extends PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground> extends ChartMarker<PointMarkerType, ResultTableBackgroundType, InternalStaticCursorXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>> implements MarkerXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY> {
    protected readonly _layer: LayerXY;
    readonly axisX: Axis;
    readonly axisY: Axis;
    protected _removeMarker: RemoveHandler<SeriesMarkerXY>;
    protected _restoreMarker: RestoreHandler<SeriesMarkerXY>;
    private gridStrokeStyleX;
    private gridStrokeStyleY;
    /**
     * @param   _layer           Rendering layer
     * @param   axisX           X axis of Marker
     * @param   axisY           Y axis of Marker
     * @param   CursorBuilder   CursorBuilder that defines look of Marker
     * @hidden
     */
    constructor(_layer: LayerXY, axisX: Axis, axisY: Axis, CursorBuilder: StaticCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>, _removeMarker: RemoveHandler<SeriesMarkerXY>, _restoreMarker: RestoreHandler<SeriesMarkerXY>);
    /**
     * Set visibility mode for gridstroke X.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setGridStrokeXVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for gridstroke X.
     * @return                  VisibilityMode
     */
    getGridStrokeXVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for gridstroke Y.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setGridStrokeYVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for gridstroke Y.
     * @return                  VisibilityMode
     */
    getGridStrokeYVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for tickMarker X.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setTickMarkerXVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for tickMarker X.
     * @return                  VisibilityMode
     */
    getTickMarkerXVisibility(): UIVisibilityModes;
    /**
     * Set visibility mode for tickMarker Y.
     * @param   visiblityMode   Defines when part is visible
     * @return                  Object itself
     */
    setTickMarkerYVisibility(visibilityMode: UIVisibilityModes): this;
    /**
     * Get visibility mode for tickMarker Y.
     * @return                  VisibilityMode
     */
    getTickMarkerYVisibility(): UIVisibilityModes;
    /**
     * Set is GridStrokeX cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeXCut(cut: boolean): this;
    /**
     * Get is GridStrokeX cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeXCut(): boolean;
    /**
     * Set is GridStrokeY cut at cursor location.
     * @param   cut         Boolean flag
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYCut(cut: boolean): this;
    /**
     * Get is GridStrokeY cut at cursor location.
     * @returns             Boolean flag
     */
    getGridStrokeYCut(): boolean;
    /**
     * Set style of x gridlstroke
     * @param   value       LineStyle object or mutator to modify existing one
     * @returns             Object itself for fluent interface
     */
    setGridStrokeXStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of x gridstroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeXStyle(): LineStyle;
    /**
     * Set style of y gridstroke
     * @param   value       LineStyle object or mutator to modify existing one
     * @returns             Object itself for fluent interface
     */
    setGridStrokeYStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of y gridsroke
     * @returns             LineStyle of gridstroke
     */
    getGridStrokeYStyle(): LineStyle;
    /**
     * Mutator function for x tick marker
     * @param   mutator     TickMarker mutator function
     * @returns             Object itself for fluent interface
     */
    setTickMarkerX(mutator: Mutator<TickMarker<TickMarkerBackgroundTypeX>>): this;
    /**
     * Get x tick marker
     * @returns             X customTick of cursor
     */
    getTickMarkerX(): TickMarker<TickMarkerBackgroundTypeX>;
    /**
     * Mutator function for y tick marker
     * @param   mutator     TickMarker mutator function
     * @returns             Object itself for fluent interface
     */
    setTickMarkerY(mutator: Mutator<TickMarker<TickMarkerBackgroundTypeY>>): this;
    /**
     * Get y tick marker
     * @returns             Y customTick of cursor
     */
    getTickMarkerY(): TickMarker<TickMarkerBackgroundTypeY>;
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return      Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
}
/**
 * Simple XY Marker that is basically a static cursor.
 * Like CursorXYs its built of four parts:
 * PointMarker shows the location of the Marker,
 * ResultTable displays information of the point
 * and X&Y tickMarkers to show gridstroke on its axes.
 */
export declare class ChartMarkerXY<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, TickMarkerXBackgroundType extends PointableBackground = PointableBackground, TickMarkerYBackgroundType extends PointableBackground = PointableBackground> extends InternalChartMarkerXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType> {
}
/**
 * Marker that can be attached on a XY series.
 * Like CursorXYs its built of four parts:
 * PointMarker shows the location of the Marker,
 * ResultTable displays information of the point
 * and X&Y tickMarkers to show gridstroke on its axes.
 */
export declare class SeriesMarkerXY<PointMarkerType extends PointMarker = PointMarker, ResultTableBackgroundType extends UIBackground = UIBackground, TickMarkerXBackgroundType extends PointableBackground = PointableBackground, TickMarkerYBackgroundType extends PointableBackground = PointableBackground> extends ChartMarkerXY<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType> {
    protected readonly _layer: LayerXY;
    readonly owningSeries: SeriesXY;
    protected _removeMarker: RemoveHandler<SeriesMarkerXY>;
    protected _restoreMarker: RestoreHandler<SeriesMarkerXY>;
    /**
     * @param   _layer          Rendering layer
     * @param   owningSeries    Series that owns marker
     * @param   CursorBuilder   CursorBuilder that defines look of Marker
     * @param   _removeMarker   Injected method to remove marker from owner's collection.
     * @hidden
     */
    constructor(_layer: LayerXY, owningSeries: SeriesXY, CursorBuilder: StaticCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerXBackgroundType, TickMarkerYBackgroundType>, _removeMarker: RemoveHandler<SeriesMarkerXY>, _restoreMarker: RestoreHandler<SeriesMarkerXY>);
    /**
     * Set position of SeriesMarker.
     * @param   position    Location on SeriesMarkers scale. Marker will be attached to closest datapoint on its series.
     * @returns             Object itself
     */
    setPosition(position: Point): this;
    /**
     * @returns True if object is attached or not attachable, false if it is not attached and attachable
     */
    isAttached(): boolean;
}
export {};
/**
 * PointLineSeries implementation of BasicSeries (actually extends PointSeries),
 * that uses both PointSets and LineSets as its segments
 */
/**
 * Implementation of *SeriesXY* for visualizing a collection of *Points* with a specifiable *PointShape*
 * and connected lines.
 *
 * *PointLineSeries* are created with *ChartXY*.**PointLineSeries()**
 */
export declare class PointLineSeries extends LineSeries implements Pointed {
    protected readonly _pointShape: PointShape;
    /**
     * @param engine                Drawing Engine
     * @param _chart                Parent Chart
     * @param _removeFromChart      Handler for removing reference to series from owning chart
     * @param axisX                 Axis X
     * @param axisY                 Axis Y
     * @param axisXAttachHandler    Attach handler for Axis X
     * @param axisYAttachHandler    Attach handler for Axis Y
     * @param _newUILayer           Factory for creating new UI layers for drawing SeriesMarkers
     * @param _dataPattern          Factory for creating setting the type of series like Freeform or Progressive
     * @param _pointShape           Shape for points of PointSeries
     * @hidden
     */
    constructor(engine: LayerXY, chart: ChartXY, _removeFromChart: RemoveHandler<PointLineSeries>, _restoreFromChart: RestoreHandler<PointLineSeries>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _dataPattern: DataPattern, _pointShape: PointShape);
    /**
     * Set point fill style of Series.
     * Use *IndividualPointFill* to enable individual coloring of points.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param fillStyle     Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns             Series itself for fluent interface.
     */
    setPointFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get normal points fill style.
     * @return  Normal point fill style.
     */
    getPointFillStyle(): FillStyle;
    /**
     * Set point fill style of Series when it is highlighted.
     * Use *IndividualPointFill* to enable individual coloring of points.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    setPointFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * @return  Current highlight point fill style
     */
    getPointFillStyleHighlight(): FillStyle;
    /**
     * Set size of point in pixels
     * @param   size    Size of point in pixels
     * @returns         Object itself for fluent interface
     */
    setPointSize(size: number): this;
    /**
     * @returns Size of point in pixels
     */
    getPointSize(): number;
    /**
     * Get shape of points.
     *
     * This is defined upon creation of series, and cannot be changed afterwards.
     * @returns PointShape
     */
    getPointShape(): PointShape;
    /**
     * Enable or disable forced highlighting of series
     * @param highlight True for enabled and false for disabled
     * @returns         Series itself for fluent interface
     */
    setHighlighted(highlight: boolean): this;
    /**
     * Solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: LineSet | PointSet, interpolate?: boolean): undefined | CursorPoint;
    /**
     * Clear all points and segments from the dataset.
     * @returns         Series itself for fluent interface
     */
    clear(): this;
    /**
     * Remove everything related to the object from all collections associated
     * with rendering cycle and allows the object to be collected by GC
     * @return Object itself for fluent interface
     */
    dispose(): this;
    /**
     * Tell the owning chart to restore this series.
     * @return  Object itself.
     */
    restore(): this;
}
/**
 * PointSeries, extension of BasicSeries using PointSets
 */
/**
 * Implementation of *SeriesXY* for visualizing a collection of *Points* by filling them with a specifiable *PointShape*.
 *
 * *PointSeries* are created with *ChartXY*.**PointSeries()**
 */
export declare class PointSeries extends BasicSeries<PointSet, Point | ColorPoint> implements Pointed {
    protected readonly _pointShape: PointShape;
    /**
     * @param engine                Drawing Engine
     * @param _chart                Parent Chart
     * @param _removeFromChart      Handler for removing reference to plot from owning chart
     * @param axisX                 Axis X
     * @param axisY                 Axis Y
     * @param axisXAttachHandler    Attach handler for Axis X
     * @param axisYAttachHandler    Attach handler for Axis Y
     * @param _newUILayer           Factory for creating new UI layers for drawing PlotMarkers
     * @param _pointShape           Shape for points of PointPlot
     * @hidden
     */
    constructor(engine: LayerXY, chart: ChartXY, _removeFromChart: RemoveHandler<PointSeries>, _restoreFromChart: RestoreHandler<PointSeries>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _pointShape: PointShape);
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Set point fill style of Series.
     * Use *IndividualPointFill* object to enable individual coloring of points.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param fillStyle     Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns             Series itself for fluent interface.
     */
    setPointFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get normal points fill style.
     * @return  Normal point fillStyle
     */
    getPointFillStyle(): FillStyle;
    /**
     * Set point fill style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    setPointFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get current highlight fill style of points.
     * @return  Current highlight point fill style
     */
    getPointFillStyleHighlight(): FillStyle;
    /**
     * Set size of point in pixels.
     * @param   size    Size of point in pixels.
     * @returns         Object itself for fluent interface.
     */
    setPointSize(size: number): this;
    /**
     * Get current size of points in pixels.
     * @returns Size of point in pixels.
     */
    getPointSize(): number;
    /**
     * Get shape of points.
     *
     * This is defined upon creation of series, and cannot be changed afterwards.
     * @returns PointShape
     */
    getPointShape(): PointShape;
    /**
     * Solves the nearest datapoint to a given coordinate on screen.
     * @param   location    Location on screen
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromScreen(location: Point): undefined | CursorPoint;
    /**
     * Solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: PointSet): undefined | CursorPoint;
}
/**
 * Interface for a series which contains points
 * @hidden
 */
export interface Pointed {
    /**
     * Set point fill style
     * @param   pointColor FillStyle for points or mutator to modify existing one
     * @returns            Series object (self)
     */
    setPointFillStyle: (pointColor: FillStyle | ImmutableMutator<FillStyle>) => this;
    /**
     * @return  Current point fill style
     */
    getPointFillStyle: () => FillStyle;
    /**
     * Set highlight point fill style
     * @param   fillStyle  FillStyle for highlighted points or mutator to modify existing one
     * @return             Object itself for fluent interface
     */
    setPointFillStyleHighlight(fillStyle: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * @return  Current highlight point fill style
     */
    getPointFillStyleHighlight: () => FillStyle | undefined;
    /**
     * Set size of point in pixels
     * @param   size    Size of point in pixels
     * @returns         Object itself for fluent interface
     */
    setPointSize(size: number): this;
    /**
     * @returns Size of point in pixels
     */
    getPointSize(): number;
    /**
     * Get shape of points.
     *
     * This is defined upon creation of Series, and cannot be changed afterwards.
     * @returns Shape of points
     */
    getPointShape(): PointShape;
}
/**
 * SeriesXY
 *
 * Extension of Series2D
 * Adds Axes, filling, setEnabled, CursorXY, abstract hover functionality (for highlighting/custom cursor logic)
 *
 */
/**
 * Abstract super-class for 2D-series with X&Y axes
 * @hidden Internal class
 */
export declare abstract class SeriesXY<VisualType extends ChartVisual = ChartVisual, CursorPointInterface extends CursorPoint = CursorPoint> extends Series2D<VisualType, CursorPointInterface> {
    readonly chart: ChartXY;
    readonly axisX: Axis;
    readonly axisY: Axis;
    private axisXAttachHandler;
    private axisYAttachHandler;
    private readonly _newUILayer;
    /**
     * Scale of the series
     */
    readonly scale: Vec2<Scale>;
    /**
     * @param engine                Drawing Engine
     * @param _chart                Parent Chart
     * @param _removeFromChart      Handler for removing reference to series from owning chart
     * @param axisX                 Axis X
     * @param axisY                 Axis Y
     * @param axisXAttachHandler    Attach handler for Axis X
     * @param axisYAttachHandler    Attach handler for Axis Y
     * @param _newUILayer           Factory for creating new UI layers for drawing SeriesMarkers
     * @hidden
     */
    constructor(engine: LayerXY, chart: ChartXY, _removeFromChart: RemoveHandler<SeriesXY>, _restoreFromChart: RestoreHandler<SeriesXY>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY);
    /**
     * Attach and cache returned remove handler
     */
    private attacheAxis;
    /**
     * Add Marker to the Series.
     * @param   cursorBuilder   StaticCursorBuilderXY object for customized look of marker.
     *                          MarkerBuilders.XY can be used to build a custom one from scratch.
     * @returns                 SeriesMarkerXY
     */
    addMarker: <PointMarkerType extends PointMarker, ResultTableBackgroundType extends UIBackground, TickMarkerBackgroundTypeX extends PointableBackground, TickMarkerBackgroundTypeY extends PointableBackground>(cursorBuilder?: StaticCursorXYBuilder<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>) => SeriesMarkerXY<PointMarkerType, ResultTableBackgroundType, TickMarkerBackgroundTypeX, TickMarkerBackgroundTypeY>;
    /**
     * Remove everything related to the object from all collections associated
     * with rendering cycle and allows the object to be collected by GC
     * @return Object itself for fluent interface
     */
    dispose(): this;
    /**
      * Tell the owning chart to restore this series.
      * @return  Object itself.
      */
    restore(): this;
    /**
     * Remove the given marker from the collection of markers this Series has.
     * @param   marker  Marker to remove.
     */
    private removeMarker;
    /**
     * Restores the given marker to the collection.
     * @param   marker  Marker to remove.
     */
    private restoreMarker;
    /**
     * @return Max X value of the series
     */
    abstract getXMax(): number | undefined;
    /**
     * @return Min X value of the series
     */
    abstract getXMin(): number | undefined;
    /**
     * @return Max Y value of the series
     */
    abstract getYMax(): number | undefined;
    /**
     * @return Min Y value of the series
     */
    abstract getYMin(): number | undefined;
}
/**
 * Interface for defining an RGBA Color with channels ranging [0, 1].
 *
 * This should be internal, as usage of Color constructor is ill-advised to promote usage of Factories.
 */
interface ColorProperties {
    /**
    * Red value from 0 to 1
    */
    r: number;
    /**
     * Green value from 0 to 1
     */
    g: number;
    /**
     * Blue value from 0 to 1
     */
    b: number;
    /**
     * Alpha value from 0 to 1
     */
    a: number;
}
/**
 * Class for specifying a color.
 *
 * Instances of Color are *immutable*, meaning that its setters don't modify the object,
 * but instead return a completely new modified object.
 *
 * Creation of Colors should be done with *Factories*, which affect various formats:
 * - ColorHEX
 * - ColorRGBA
 *
 * Watch out though, the color information is always stored in RGBA format with channels ranging [0, 255],
 * regardless of how the information is supplied when created !
 */
export declare class Color {
    /**
     * Color constructor should be hidden, even though the class is public in order to promote usage of Factories.
     * @hidden
     */
    constructor(color: Partial<ColorProperties>);
    /**
     * Creates a new color that is equal to this but with a certain alpha value
     * @param   alpha   Value of alpha channel [0-255]
     * @return          New Color object
     */
    setA(alpha: number): Color;
    /**
     * Creates a new color that is equal to this but with a certain red value
     * @param   red   Value of red channel [0-255]
     * @return        New Color object
     */
    setR(red: number): Color;
    /**
     * Creates a new color that is equal to this but with a certain green value
     * @param   green   Value of green channel [0-255]
     * @return          New Color object
     */
    setG(green: number): Color;
    /**
     * Creates a new color that is equal to this but with a certain blue value
     * @param   blue   Value of blue channel [0-255]
     * @return         New Color object
     */
    setB(blue: number): Color;
    /**
     * @returns Value of alpha channel [0-255]
     */
    getA(): number;
    /**
     * @returns Value of red channel [0-255]
     */
    getR(): number;
    /**
     * @returns Value of green channel [0-255]
     */
    getG(): number;
    /**
     * @returns Value of blue channel [0-255]
     */
    getB(): number;
    /**
     * Compute a highlighted version of this Color.
     * @returns New Color object
     */
    getHighlight(): Color;
}
export {};
/**
 * Interface for all properties of a FillStyle.
 */
export interface FillStyleProperties {
    /**
     * For SolidFill: Color which is used to fill shape.
     *
     * For IndividualPointFill: Fallback Color for filling shape if individual Color was not given.
     */
    color: Color;
}
/**
 * Base class for styling of 2D shapes
 * @hidden  Internal class
 */
export declare abstract class FillStyle {
    /**
     * Get automatically computed highlight style.
     * @return  FillStyle object
     */
    getDefaultHighlightStyle(): this;
    /**
     * @return Newly created default highlight style of this one, with lighter fill color
     */
    protected abstract createDefaultHighlightStyle(): this;
}
/**
 * Singleton object which indicates that shape should not be filled.
 *
 * When *emptyFill* is used, the area that would be filled does **NOT** trigger mouse / touch -events, and
 * its rendering process is skipped, which results in saved performance.
 */
export declare const emptyFill: FillStyle;
/**
 * Abstract class that indicates some visible Filling.
 * Used only for instanceOf check at Engine
 * @hidden Internal class
 */
export declare abstract class VisibleFill extends FillStyle {
}
/**
 * Class for specifying fill style with a single, solid Color.
 *
 * Instances of SolidFill are *immutable*, meaning that its setters don't modify the object,
 * but instead return a completely new modified object.
 *
 * When creating a new SolidFill object from scratch, parameters can be passed like follows:
 * - new SolidFill({ color: ColorHEX('#F00') })
 */
export declare class SolidFill extends VisibleFill {
    /**
     * When creating a new SolidFill object from scratch, the parameters can be passed like follows:
     * - new SolidFill({ color: ColorHEX('#F00') })
     * @param   props   Optional object containing parameters for creation of SolidFill
     */
    constructor(props?: Partial<FillStyleProperties>);
    /**
     * Construct a new SolidFill object based on this one, but with modified color.
     *
     * Example usage:
     *
     * | Desired result         | Argument                  |
     * | :--------------------- | :------------------------ |
     * | Specified Color        | ColorHex('#F00')          |
     * | Changed transparency   | (color) => color.setA(80) |
     *
     * @param   value   Either a Color object or a function, which will be used to create a new Color based on current value.
     * @return          New SolidFill object
     */
    setColor(value: Color | ImmutableMutator<Color>): this;
    /**
     * Get color of SolidFill.
     * @return  Color object
     */
    getColor(): Color;
    /**
     * Construct a new SolidFill object based on this one, but with a modified Alpha value.
     *
     * @param  alpha    Value of Alpha channel [0-255]
     * @return          New SolidFill object
     */
    setA(alpha: number): SolidFill;
    /**
     * Construct a new SolidFill object based on this one, but with a modified Red value.
     *
     * @param  alpha    Value of Red channel [0-255]
     * @return          New SolidFill object
     */
    setR(red: number): SolidFill;
    /**
     * Construct a new SolidFill object based on this one, but with a modified Green value.
     *
     * @param  green    Value of Green channel [0-255]
     * @return          New SolidFill object
     */
    setG(green: number): SolidFill;
    /**
     * Construct a new SolidFill object based on this one, but with a modified Blue value.
     *
     * @param  blue     Value of Blue channel [0-255]
     * @return          New SolidFill object
     */
    setB(blue: number): SolidFill;
    /**
     * @return Newly created default highlight style of this one, with lighter fill color
     */
    protected createDefaultHighlightStyle(): this;
}
/**
 * Class for enabling individual fill style for point-based Series.
 *
 * When this is selected as fill style, the Series will allow using *PointColor*s instead of normal *Point*s when adding data.
 * If *Point* is still used, the configurable Fallback Color is used.
 *
 * Instances of IndividualPointFill are *immutable*, meaning that its setters don't modify the object,
 * but instead return a completely new modified object.
 *
 * When creating a new IndividualPointFill object from scratch, parameters can be passed like follows:
 * - new IndividualPointFill({ color: ColorHEX('#F00') })
 */
export declare class IndividualPointFill extends VisibleFill {
    /**
     * When creating a new IndividualPointFill object from scratch, the parameters can be passed like follows:
     * - new IndividualPointFill({ color: ColorHEX('#F00') })
     * @param   props   Optional object containing parameters for creation of IndividualPointFill
     */
    constructor(props?: Partial<FillStyleProperties>);
    /**
     * Construct a new IndividualPointFill object based on this one, but with a modified Fallback Color.
     *
     * Example usage:
     *
     * | Desired result             | Argument                  |
     * | :------------------------- | :------------------------ |
     * | Specified Fallback Color   | ColorHex('#F00')          |
     * | Changed transparency       | (color) => color.setA(80) |
     *
     * @param   value   Either a Color object or a function, which will be used to create a new Color based on current value.
     * @return          New IndividualPointFill object
     */
    setFallbackColor(color: Color): this;
    /**
     * Get Fallback Color of IndividualPointFill.
     * @return  Color object
     */
    getFallbackColor(): Color;
    /**
     * Get automatically computed highlight style.
     * @return  Object itself, because the Color information is stored in *PointColor*
     */
    createDefaultHighlightStyle(): this;
}
/**
 * The font-weight property specifies the weight (or boldness) of the font.
 * The font weights available to you will depend on the font-family you are using.
 * Some fonts are only available in normal and bold.
 */
export declare type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
/**
 * The font-style attribute specifies whether the text is to be rendered using a normal, italic or oblique face.
 */
export declare type FontStyle = 'normal' | 'italic' | 'oblique';
/**
 * Interface with values of FontSettings.
 */
export interface FontProperties {
    /**
     * The size, or height of the font.
     */
    size: number;
    /**
     * The list of typeface names / family names.
     */
    family: string;
    /**
     * The weight style, or thickness of the font characters.
     */
    weight: FontWeight;
    /**
     * The style of the font.
     */
    style: FontStyle;
    /**
     * Small caps or not.
     */
    variant: boolean;
}
/**
 * Class for specifying a font.
 *
 * Instances of FontSettings are *immutable*, meaning that its setters don't modify the object,
 * but instead return a completely new modified object.
 *
 * When creating a new FontSettings object from scratch, parameters can be passed like follows:
 * - new FontSettings({ size: 18, style: 'italic' })
 */
export declare class FontSettings {
    /**
     * When creating a new FontSettings object from scratch, parameters can be passed like follows:
     * - new FontSettings({ size: 18, style: 'italic' })
     * @param   props   Optional object containing parameters for creation of FontSettings
     */
    constructor(props?: Partial<FontProperties>);
    /**
     * Create new FontSettings object with different font size.
     * @param fontSize      The size, or height of the font.
     * @returns             New FontSettings object.
     */
    setSize(size: number): this;
    /**
     * Create new FontSettings object with different font family.
     * @param fontFamily    The list of typeface names / family names.
     * @returns             New FontSettings object.
     */
    setFamily(family: string): this;
    /**
     * Create new FontSettings object with different font weight.
     * @param weight    The weight style, or thickness of the font characters.
     *                  Options: "normal" | "bold" | "bolder" | "lighter" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
     * @returns         New FontSettings object.
     */
    setWeight(weight: FontWeight): this;
    /**
     * Create new FontSettings object with different font style.
     * @param style The style of the font. Options: "normal" | "italic" | "oblique"
     * @returns             New FontSettings object.
     */
    setStyle(style: FontStyle): this;
    /**
     * Create new FontSettings object with different font variant.
     * The font-variant property specifies whether or not a text should be displayed in a small-caps font.
     * @param smallCaps     true selects font-variant: "small-caps", otherwise "normal".
     * @returns             New FontSettings object.
     */
    setVariant(smallCaps: boolean): this;
    /**
     * Get size of font
     * @return          The size, or height of the font.
     */
    getSize(): number;
    /**
     * Get family of font
     * @return          The list of typeface names / family names.
     */
    getFamily(): string;
    /**
     * Get weight of font
     * @return          The weight style, or thickness of the font characters.
     */
    getWeight(): FontWeight;
    /**
     * Get style of font
     * @return          The style of the font.
     */
    getStyle(): FontStyle;
    /**
     * Get variant of font
     * @return          Small caps or not
     */
    getVariant(): boolean;
}
/**
 * Interface for all properties of a LineStyle.
 */
export interface LineStyleProperties {
    /**
     * Line fill style.
     */
    fillStyle: VisibleFill;
    /**
     * Line thickness as an integer.
     *
     * Setting a non-integer number might result in rendering errors.
     */
    thickness: number;
}
/**
 * Base class for styling of 2D shapes' line area
 * @hidden  Internal class
 */
export declare abstract class LineStyle {
    /**
     * Get automatically computed highlight style.
     * @return  LineStyle object
     */
    getDefaultHighlightStyle(): this;
    /**
     * @return Newly created default highlight style of this one, with lighter fill color and bigger thickness
     */
    protected abstract createDefaultHighlightStyle(): this;
}
/**
 * Singleton object which specifies that line should not be rendered.
 *
 * When *emptyLine* is used, the line that would be rendered does **NOT** trigger mouse / touch -events, and
 * its rendering process is skipped, which results in saved performance.
 */
export declare const emptyLine: LineStyle;
/**
 * Class for specifying a solid line style.
 *
 * Instances of SolidLine are *immutable*, meaning that its setters don't modify the object,
 * but instead return a completely new modified object.
 *
 * When creating a new SolidLine object from scratch, parameters can be passed like follows:
 * - new SolidLine({ thickness: 5, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })
 */
export declare class SolidLine extends LineStyle {
    /**
     * When creating a new SolidLine object from scratch, parameters can be passed like follows:
     * - new SolidLine({ thickness: 5, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })
     * @param   props   Optional object containing parameters for creation of SolidLine
     */
    constructor(props?: Partial<LineStyleProperties>);
    /**
     * Construct a new SolidLine object based on this one, but with modified fill style.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                      |
     * | :--------------------- | :-------------------------------------------- |
     * | Specified VisibleFill  | new SolidFill({ color: ColorHex('#F00') })    |
     * | Changed transparency   | (solidFill) => solidFill.setA(80)             |
     *
     * @param   value   Either a VisibleFill object or a function, which will be used to create a new VisibleFill based on current value.
     * @return          New SolidLine object
     */
    setFillStyle(value: VisibleFill | ImmutableMutator<VisibleFill>): this;
    /**
     * Get fill style of SolidLine.
     * @return  VisibleFill object
     */
    getFillStyle(): VisibleFill;
    /**
     * Construct a new SolidLine object based on this one, but with modified thickness.
     *
     * @param   thickness   Thickness as pixels. This will be rounded to closest integer!
     */
    setThickness(thickness: number): this;
    /**
     * Get thickness of SolidLine
     * @return  Thickness as pixels
     */
    getThickness(): number;
    /**
     * @returns the default highlight style of this lineStyle
     */
    protected createDefaultHighlightStyle(): this;
}
/**
 * Generic Font, specifies settings of a text object
 * @param font          Web font in final a string format.
 * @param settings      Object with font settings [family, size, weight, style].
 */
export interface Font {
    readonly font: string;
    readonly height: number;
}
/**
 * Factory for Font Interface.
 * @param position          Position in 2D space
 * @param value             Generic value
 */
export declare const Font: (font: string, height: number) => {
    font: string;
    height: number;
};
/**
 * A factory for creating caching web-fonts settings for a further Text rendering.
 * @param   settings    FontSettings
 */
export declare const Fonts: (settings: FontSettings) => Font;
/**
 * The CanvasRenderingContext2D.textBaseline property of the Canvas 2D API specifies the current text baseline being used when drawing text.
 */
export declare type TextBase = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
/**
 * The CanvasRenderingContext2D.textAlign property of the Canvas 2D API specifies the current text alignment being used when drawing text.
 * Beware that the alignment is based on the x value of the fillText() method.
 */
export declare type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';
/**
 * @hidden Internal class
 */
export declare class TextTexture {
    private readonly _context2D;
    /**
     * The HTML5 canvas is for visual debugging only.
     */
    canvas: HTMLCanvasElement;
    /**
     * The 2D rendering context of the canvas.
     */
    context: CanvasRenderingContext2D;
    /**
     * Creates or uses a given CanvasRenderingContext for caputring the textures with a drawn text.
     * @param fontFamily    Font object with all the information about font.
     * @param _context2D     Canvas for texture generation. Set you own canvas if it is needed.
     */
    constructor(_context2D?: CanvasRenderingContext2D | null);
    /**
     * Draw a given text to texture with a given settings.
     * @param text          Specify a text to be rendered on a texture.
     * @param font          Specify a Web font for the text.
     * @param margins       Specify the area between the main content and the edges.
     * @returns             ImageData object - [Array of pixels, width, height]
     */
    textureFromString(text: string, fontInfo: Font, margins?: Margin): ImageData;
}
/**
 * A factory for creating and capturing textures with a Text for further rendering.
 * @param context2D         Canvas rendering context for Text Texture capturing.
 */
export declare const TextFactory: (context2D?: CanvasRenderingContext2D | null) => (text: string, font: Font, margins?: Margin) => ImageData;
/**
 * A method for accurate measurment and caching of the specified text with a given font settings.
 * @param text              A string to be measured.
 * @param fontSettings      Font settings to be applied for the given text.
 */
export declare const MeasureText: (text: string, fontSettings: FontSettings) => Point;
export {};
export {};
export {};
export {};
/**
 * Base class for Mouse-interactable ui-objects.
 * @hidden Internal class
 */
export declare abstract class UIObject implements Interactable {
    /**
     * Subscribe to Mouse Enter event
     * @param   listener    Function that will be called when mouse enters the bounds of UiObject.
     * @param   obj         Always object itself.
     * @param   event       MouseEvent that triggered the listener.
     * @return              Token-object that is a reference ID to the listener created.
     */
    onMouseEnter(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Leave event
     * @param   listener    Function that will be called when mouse leaves the bounds of UiObject.
     * @param   obj         Always object itself.
     * @param   event       MouseEvent that triggered the listener.
     * @return              Token-object that is a reference ID to the listener created.
     */
    onMouseLeave(listener: AbruptMouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Click event
     * @param   listener    Function that will be called when mouse clicks the bounds of UiObject.
     * @param   obj         Always object itself.
     * @param   event       MouseEvent that triggered the listener.
     * @return              Token-object that is a reference ID to the listener created.
     */
    onMouseClick(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Double Click event
     */
    onMouseDoubleClick(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Down event
     */
    onMouseDown(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Up event
     */
    onMouseUp(listener: MouseEventHandler<this>): Token;
    /**
    * Subscribe to Mouse Move event
    * @param   listener    Event handler function
    * @returns             Token of subscription
    */
    onMouseMove(listener: MouseEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag Start event
     */
    onMouseDragStart(listener: MouseDragStartEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag event
     */
    onMouseDrag(listener: MouseDragEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Drag Stop event
     */
    onMouseDragStop(listener: MouseDragStopEventHandler<this>): Token;
    /**
     * Subscribe to Mouse Wheel event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onMouseWheel(listener: MouseWheelEventHandler<this>): Token;
    /**
     * Subscribe to Touch Start event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onTouchStart(listener: TouchEventHandler<this>): Token;
    /**
     * Subscribe to Touch Move event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onTouchMove(listener: TouchEventHandler<this>): Token;
    /**
     * Subscribe to Touch End event
     * @param   listener    Event handler function
     * @returns             Token of subscription
     */
    onTouchEnd(listener: TouchEventHandler<this>): Token;
    /**
     * Remove event listener from Mouse Enter Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseEnter(token: Token): boolean;
    /**
     * Remove event listener from Mouse Leave Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseLeave(token: Token): boolean;
    /**
     * Remove event listener from Mouse Click Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseClick(token: Token): boolean;
    /**
     * Remove event listener from Mouse Double Click Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDoubleClick(token: Token): boolean;
    /**
     * Remove event listener from Mouse Down Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDown(token: Token): boolean;
    /**
     * Remove event listener from Mouse Up Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseUp(token: Token): boolean;
    /**
     * Remove event listener from Mouse Move Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseMove(token: Token): boolean;
    /**
     * Remove event listener from Mouse Drag Start Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDragStart(token: Token): boolean;
    /**
     * Remove event listener from Mouse Drag Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDrag(token: Token): boolean;
    /**
     * Remove event listener from Mouse Drag Stop Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseDragStop(token: Token): boolean;
    /**
     * Remove event listener from Mouse Wheel Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offMouseWheel(token: Token): boolean;
    /**
     * Remove event listener from Touch Start Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchStart(token: Token): boolean;
    /**
     * Remove event listener from Touch Move Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchMove(token: Token): boolean;
    /**
     * Remove event listener from Touch End Event
     * @param   token   Token of event listener which has to be removed
     * @return          True if the listener is successfully removed and false if it is not found
     */
    offTouchEnd(token: Token): boolean;
    /**
     * Set mouse interactions enabled.
     * Implementations should update the mouse-interactions of any Shapes they may contain here.
     * @param   state
     */
    abstract setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    abstract getMouseInteractions(): boolean;
    /**
     * Get boolean flag for whether object is currently under mouse or not
     * @return  Boolean for is object under mouse currently
     */
    getIsUnderMouse(): boolean;
}
/**
 * Public interface for a primitive UiElement that is not responsible for its own positioning.
 * This is the base-type when user is dealing with dynamically created ui-parts, for example when adding parts to layouts.
 * @hidden
 */
export interface UIPart extends Interactable, Marginable, Disposable {
    /**
     * Set mouse style when hovering over UI object.
     * @param   mouseStyle  Interface for defining how mouse should look when hovering over UI object
     * @return              Object itself
     */
    setMouseStyle(mouseStyle: UIMouseStyle): this;
    /**
     * Get mouse style.
     * @return              Interface for defining how mouse should look when hovering over UI object
     */
    getMouseStyle(): UIMouseStyle;
}
/**
 * Interface for a stand-alone *UIElement*.
 *
 * Adds ability for:
 * - Setting position
 * - Specifying draggability
 */
export interface UIElement extends UIObject, UIPart, Draggable, Plotable, Disposable {
    /**
     * Sets the position of this UiElement relative to its origin
     * @param position              Position
     */
    setPosition(position: Point): this;
    /**
     * Returns the position of this UiElement at given location relative to elements size.
     * @param relativePosition      Relative position vector (-1 to 1 which specifies position of origin, 0 is center of the object)
     * @param spaceOfInterest       Parameter to disregard parts of object when calculating the asked position. Defaults to Margin.
     * @return                      Object itself for fluent itself
     */
    getPosition(relativePosition?: Point, spaceOfInterest?: UISpace): Point;
    /**
     * Sets the position origin of this UiElement.
     * @param   origin  Relative position vector (-1 to 1, where 0 is center of the object).
     *                  UIOrigins, enum-like object can be used for easy selection of common values
     */
    setOrigin(origin: Point): this;
    /**
     * Returns the position origin of this UiElement.
     * @return  Relative position vector (-1 to 1, where 0 is center of the object).
     */
    getOrigin(): Point;
    /**
     * Returns the size of the UiElements in pixels including any Margins or Paddings
     * @param spaceOfInterest       Parameter to disregard parts of object when calculating the position. Defaults to Margin,
     *                              which includes everything. Should only ever be necessary for sub-classes
     * @return                      Object size in pixels
     */
    getSize(spaceOfInterest?: UISpace): Point;
}
/**
 * Type of constructor of UI elements.
 * @hidden
 */
export declare type UIElementConstructor<T extends UIPart> = new (layer: LayerXY, scale: Vec2<Scale>, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>) => T & InternalUIElement;
/**
 * Base class for UI elements.
 * @hidden Internal class
 */
export declare abstract class InternalUIElement extends UIObject implements UIElement, Disposable {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    private readonly _remove;
    private readonly _restore;
    protected position: Point;
    protected origin: Point;
    protected size: Point;
    /**
     * @param _layer    Layer of drawing engine. Should be kept protected at all times
     * @param scale     Drawing scale of UiElement
     * @param _remove   Injected remove method from parent.
     * @param _restore  Injected restore method from parent.
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<UIElement>, _restore: RestoreHandler<UIElement>);
    /**
     * Returns the size of the UiElements in pixels including any Margins or Paddings
     * @param spaceOfInterest       Parameter to disregard parts of object when calculating the position. Defaults to Margin,
     *                              which includes everything. Should only ever be necessary for sub-classes
     * @return                      Object size in pixels
     */
    getSize(spaceOfInterest?: UISpace): Point;
    /**
     * Member function that updates the size of the UI elements contents.
     * UiElements should apply this inside 'update'
     * @param   sizeInPixels    Size of element in pixels
     */
    protected setContentSize(sizeInPixels: Point): void;
    /**
     * Utility method for getting the pixel-size of the UiElements scale.
     * NOTE: This will return the ABSOLUTE pixel size, meaning that the individual values are always positive, even with inverted axes.
     */
    getPixelSize: () => Point;
    /**
     * Returns the size of this UiElement on its rendering scale
     * Use to set the size of engine shapes
     */
    protected getSizeOnScale: (size?: Point) => Point;
    /**
     * Set margin around object in pixels.
     * @param   margin      Number with pixel margins for all sides or datastructure with individual pixel margins
     *                      for each side. Any side can be omitted, only passed values will be overridden.
     * @return              Object itself
     */
    setMargin(margin: Partial<MMargin> | number): this;
    /**
     * Get margin around object in pixels.
     * @return  Margin datastructure
     */
    getMargin(): Margin;
    /**
     * Dispose object, ceasing its operation while keeping the object intact until call of 'restore'.
     * @return Object itself for fluent interface
     */
    dispose(): this;
    /**
     * Restore object if it was previously disposed.
     * @returns Object itself itself for fluent interface
     */
    restore(): this;
    /**
     * Return the current state of Disposable object.
     * @return True if object is disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Sets the position of this UiElement relative to its origin.
     *
     * NOTE: UIElements scale can't be changed apart from when it is created.
     * @param position  Location on the UIElements scale, where its origin should be positioned
     * @return          Object itself
     */
    setPosition(position: Point): this;
    /**
     * Returns the position of this UiElement at given location relative to elements size.
     * @param relativePosition      Relative position vector (-1 to 1 which specifies position of origin, 0 is center of the object)
     * @param spaceOfInterest       Parameter to disregard parts of object when calculating the asked position. Defaults to Margin,
     *                              which includes everything. Should only ever be necessary for other UiElements
     * @return                      Object itself for fluent itself
     */
    getPosition(relativePosition?: Point, spaceOfInterest?: UISpace): Point;
    /**
     * Sets the position origin of this UiElement. Affects how the "position" of UIElement is interpreted.
     *
     * See UIOrigins for a collection of common arguments in an easy-to-read format.
     * @param   Vec2 with each plane in range [-1, 1], where 0 is middle
     * @return  Object itself
     */
    setOrigin(origin: Point): this;
    /**
     * Get the position origin of this UiElement. Affects how the "position" of UIElement is interpreted.
     *
     * @return  Vec2 with each plane in range [-1, 1], where 0 is middle
     */
    getOrigin(): Point;
    /**
     * Set dragging mode of object. Defines how the object can be dragged by mouse.
     *
     * See **UIDraggingModes**-collection for options.
     * @param       draggingMode    DraggingMode or undefined to disable dragging
     * @returns                     Object itself
     */
    setDraggingMode(draggingMode?: UIDraggingModes): this;
    /**
     * Get dragging mode of object.
     * Defines how the object can be dragged by mouse.
     * @returns                     Object itself
     */
    getDraggingMode(): UIDraggingModes;
    /**
     * Set mouse style when hovering over UI object.
     * @param   mouseStyle  Interface for defining how mouse should look when hovering over UI object
     * @return              Object itself
     */
    setMouseStyle(mouseStyle: UIMouseStyle): this;
    /**
     * Get mouse style.
     * @return              Interface for defining how mouse should look when hovering over UI object
     */
    getMouseStyle(): UIMouseStyle;
}
/**
 * Public interface for a UiElement that has background, but is not responsible for its own positioning.
 * @hidden
 */
export interface UIPartWithBackground<BackgroundType extends UIBackground> extends UIPart, StylableBackground<BackgroundType> {
}
/**
 * Public interface for a UiElement with background.
 * @hidden Internal class
 */
export declare abstract class UIElementWithBackground<BackgroundType extends UIBackground = UIBackground> extends InternalUIElement implements UIPartWithBackground<UIBackground> {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    private _BackgroundClass;
    /**
     * Background object.
     * Can't be changed at runtime
     */
    protected readonly backgroundElement: InternalBackground & BackgroundType;
    /**
     * @param   _layer               Rendering layer
     * @param   scale               Rendering scale
     * @param   _BackgroundClass          Constructor for Background of UiElementLine
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _BackgroundClass: BackgroundConstructor<InternalBackground & BackgroundType>, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>);
    /**
     * Method for mutating Background of object.
     *
     * Type of Background is generic, see **UIBackground** for minimum interface.
     * @param   mutator Mutator function for Background
     * @return          Object itself for fluent interface
     */
    setBackground(mutator: Mutator<BackgroundType>): this;
    /**
     * Get Background of object.
     *
     * Type of Background is generic, see **UIBackground** for minimum interface.
     * @returns     Background object
     */
    getBackground(): BackgroundType;
    /**
     * Dispose object, ceasing its operation while keeping the object intact until call of 'restore'.
     * @return Object itself for fluent interface
     */
    dispose(): this;
    /**
     * Restore object if it was previously disposed.
     * @returns Object itself itself for fluent interface
     */
    restore(): this;
    /**
     * @return True if all sub-elements are disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Set padding around object in pixels.
     * Padding is empty space between the UiElements content and Background
     * @param   padding     Number with pixel margins for all sides or datastructure with individual pixel paddings
     *                      for each side. Any side can be omitted, only passed values will be overridden.
     * @return              Object itself
     */
    setPadding(padding: Partial<Margin> | number): this;
    /**
     * Get padding around object in pixels.
     * Padding is empty space between the UiElements content and Background
     * @return  Margin datastructure
     */
    getPadding(): Margin;
    /**
     * Returns the size of the UiElements in pixels including any Margins or Paddings
     * @param spaceOfInterest       Parameter to disregard parts of object when calculating the position. Defaults to Margin,
     *                              which includes everything. Should only ever be necessary for sub-classes
     * @return                      Object size in pixels
     */
    getSize(spaceOfInterest?: UISpace): Point;
    /**
     * Returns the position of this UiElement at given location relative to elements size.
     * @param relativePosition      Relative position vector (-1 to 1 which specifies position of origin, 0 is center of the object)
     * @param spaceOfInterest       Parameter to disregard parts of object when calculating the asked position.
     * @return                      Object itself for fluent itself
     */
    getPosition(relativePosition?: Point, spaceOfInterest?: UISpace): Point;
    /**
     * Set mouse interactions enabled or disabled
     * @para state Specifies state of mouse interactions
     * @return     Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
    /**
     * @return True for highlighted state of object and false for basic
     */
    getHighlighted(): boolean;
    /**
     * Set highlighted state of the Object.
     * Implementations should also remember to highlight themselves here.
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
}
/**
 * Type definition for a dynamic mouse style setting.
 * This allows for mouse styles that depend on situation.
 * @param   uiElement   UIElement to apply
 * @return              Mouse style as string or undefined
 */
export declare type DynamicUIMouseStyle<T extends UIElement> = (uiElement: T) => string | undefined;
/**
 * Type definition for a mouse style setting. This tells how mouse should look when hovering over an UIElement.
 *
 * For a collection of mouse styles, see **UIMouseStyles**.
 */
export declare type UIMouseStyle = string | DynamicUIMouseStyle<UIElement>;
/**
 * File contains interfaces for Backgrounds
 */
/**
 * Public interface of Background.
 * Type of UiElement that can be used as a Background of another element.
 */
export interface UIBackground {
    /**
     * Set FillStyle of Background.
     * @param value Fill style object or function which modifies it
     * @return      Object itself for fluent interface
     */
    setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * @return      Current Background FillStyle
     */
    getFillStyle(): FillStyle;
    /**
     * Set stroke style of Background.
     * @param value LineStyle object or function which modifies it
     * @return      Object itself for fluent interface
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * @return      Current Background LineStyle
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set highlighted FillStyle of Background
     * @param highlightStyle    FillStyle for highlighted object or mutator to modify existing one or undefined for auto assignment
     * @returns                 Object itself for fluent interface
     */
    setFillStyleHighlight(setter: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * @return      Highlighted FillStyle of Background or undefined for auto assignment
     */
    getFillStyleHighlight(): FillStyle | undefined;
}
/**
 * Internal interface of Background.
 * Type of UiElement that can be used as a Background of another element.
 * The main requirement for a background is to be fitted to a rectangle of any size.
 * @hidden
 */
export interface InternalBackground extends UIElement, UIBackground, Highlightable {
}
/**
 * Type of Background constructor
 * @param   layer   Rendering layer
 * @param   scale   Rendering scale
 * @hidden
 */
export declare type BackgroundConstructor<T extends UIBackground = UIBackground> = new (layer: LayerXY, scale: Vec2<Scale>, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>) => T;
/**
 * Background that can be pointed at a direction (left,right,up or down)
 */
export interface PointableBackground extends Pointable, UIBackground {
}
/**
 * Type of Pointable Background constructor
 * @param   layer   Rendering layer
 * @param   scale   Rendering scale
 * @hidden
 */
export declare type PointableBackgroundConstructor<T extends InternalBackground & PointableBackground = (InternalBackground & PointableBackground)> = new (layer: LayerXY, scale: Vec2<Scale>, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>) => T;
/**
 * Type of function for styling a generic UIElement.
 */
export declare type UIElementStyler<T = UIElement> = Mutator<T>;
/**
 * Interface for abstract UiElement builder
 */
export interface UIElementBuilder<UIElementType extends UIPart = UIPart> {
    /**
     * Make new Builder with an additional styler.
     * @param   styler  UiElementStyler for specific type
     * @returns         New Builder
     */
    addStyler(styler: UIElementStyler<UIElementType>): this;
}
/**
 * File contains enums and layout-classes for positioning uiElements relatively.
 * Also their builders.
 */
/**
 * Base class for positioning of UiElements in a line
 * @hidden Internal class
 */
export declare abstract class UIElementLine<BackgroundType extends UIBackground = UIBackground> extends UIElementWithBackground<BackgroundType> {
    /**
     * Returns list of UiElements inside Line
     */
    getMembers(): Array<UIPart>;
    /**
     * Get amount of members in group.
     * @return  Number
     */
    getMemberCount(): number;
    /**
     * Set minimum size Layout should occupy (in direction of layout).
     * If set, Layout will distribute any extra space to UiLayoutGaps among its members.
     * @param   minSize     Min size Layout should occupy (in direction of layout) or undefined to disable feature
     * @return              Object itself
     */
    setMinimumSize(minSize: pixel | undefined): this;
    /**
     * Get minimum size Layout should occupy (in direction of layout).
     * If set, Layout will distribute any extra space to UiLayoutGaps among its members.
     * @return              Min size Layout should occupy (in direction of layout) or undefined to disable feature
     */
    getMinimumSize(): pixel | undefined;
    /**
     * Add any UiElement using a builder
     * @param   builder Builder for any UiElement
     * @param   index   Index position or < 0 to push
     * @returns         Created UiElement
     */
    addElement<UiElementType extends UIPart>(builder: UIElementBuilder<UiElementType>, index?: number): UiElementType;
    /**
     * Add gap to line.
     * Gap can have fixed size and it also has custom logic which makes it occupy any extra space
     * caused by setting the minimum size for Line.
     * @param   fixedSize   Optional fixed size to set gap
     * @param   index       Index position or < 0 to push
     * @return              Object itself
     */
    abstract addGap(fixedSize?: pixel, index?: number): UILayoutGap;
    /**
     * Disposes objects inside the element.
     * UiElement will still be usable, but will not update itself nor render.
     * Disposed elements can be restored using 'restore()'
     * Implementations should use setEnabled on any other elements/Shapes they contain!
     * @return Object itself for fluent interface
     */
    dispose(): this;
    /**
     * Restore whatever resources this object has from rendering engine.
     * Implementations should use setEnabled on any other elements/Shapes they contain!
     * @returns Object itself itself for fluent interface
     */
    restore(): this;
    /**
     * @return True if all sub-elements have been disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Set mouse interactions enabled.
     * This will set the states of all members inside the Layout, overriding any previou settings.
     * @param state     Mouse interactions enabled
     */
    setMouseInteractions(state: boolean): this;
    /**
     * Get mouse interactions enabled.
     * @return  True if any member of Layout has mouse interactions enabled.
     */
    getMouseInteractions(): boolean;
    /**
     * Set highlighted state of the Lines Background and all of its members
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
}
/**
 * UI Layout for positioning UIElements in a row.
 */
export declare class UIElementRow<BackgroundClass extends UIBackground = UIBackground> extends UIElementLine<BackgroundClass> {
    /**
     * Add gap to Row.
     * Gap can have fixed width and it also has custom logic which makes it occupy any extra space
     * caused by setting the minimum size for Line.
     * @param   fixedSize   Optional fixed size to set gap
     * @return              Object itself
     */
    addGap(fixedSize?: pixel, index?: number): UILayoutGap;
}
/**
 * UI Layout for positioning UIElements in a column.
 */
export declare class UIElementColumn<BackgroundClass extends UIBackground = UIBackground> extends UIElementLine<BackgroundClass> {
    /**
     * Add gap to Column.
     * Gap can have fixed height and it also has custom logic which makes it occupy any extra space
     * caused by setting the minimum size for Line.
     * @param   fixedSize   Optional fixed size to set gap
     * @return              Gap object
     */
    addGap(fixedSize?: pixel, index?: number): UILayoutGap;
}
/**
 * UiElement class that marks a 'gap' in line-layouts.
 * Positioning logic will make it so these gaps occupy all extra space.
 */
export declare class UILayoutGap extends EmptyUIElement {
    /**
     * Set size of gap.
     * @param   size    Size of gap as Vec2 of pixels
     * @return          Object itself
     */
    setSize(size: Point): this;
}
/**
 * Class which represents a grid of abstract UiElements.
 * Grid is formed from vertical lines, 'columns', that can have individual member anchoring.
 * @hidden  Internal class. HIDDEN FOR NOW, AS THE IMPLEMENTATION IS NOT TESTED OR USED (on public side)
 */
export declare class UIColumnGrid<BackgroundClass extends UIBackground = UIBackground> extends UIElementRow<BackgroundClass> {
    /**
     * Add new column to grid
     */
    addColumn(): UIElementColumn;
    /**
     * Get column at specified index
     * @param   index   Index to look for
     * @param   ensure? If true, grid adds the column and any missing ones if it doesn't exist
     * @return          UiElementColumn at given index
     */
    getColumn(index: number, ensure?: boolean): UIElementColumn;
}
/**
 * Class which represents a grid of abstract UiElements.
 * Grid is formed from horizontal lines, 'rows', that can have individual member anchoring.
 * @hidden  Internal class. HIDDEN FOR NOW, AS THE IMPLEMENTATION IS NOT TESTED OR USED (on public side)
 */
export declare class UIRowGrid<BackgroundClass extends UIBackground = UIBackground> extends UIElementColumn<BackgroundClass> {
    /**
     * Add new row to grid
     */
    addRow(): UIElementRow;
    /**
     * Get row at specified index
     * @param   index   Index to look for
     * @param   ensure? If true, grid adds the row and any missing ones if it doesn't exist
     * @return          UiElementRow at given index
     */
    getRow(index: number, ensure?: boolean): UIElementRow;
}
/**
 * Interface for builder of UiColumn layout
 */
export interface UIColumnBuilder<BackgroundType extends UIBackground = UIBackground> extends UIElementBuilder<UIElementColumn<BackgroundType>> {
    /**
     * Make new ColumnBuilder with different background
     */
    setBackground<NewBackgroundType extends BackgroundType>(newBackground: BackgroundConstructor<NewBackgroundType>): UIColumnBuilder<NewBackgroundType>;
}
/**
 * Interface for builder of UiRow layout
 */
export interface UIRowBuilder<BackgroundType extends UIBackground = UIBackground> extends UIElementBuilder<UIElementRow<BackgroundType>> {
    /**
     * Make new RowBuilder with different background
     */
    setBackground<NewBackgroundType extends BackgroundType>(newBackground: BackgroundConstructor<NewBackgroundType>): UIRowBuilder<NewBackgroundType>;
}
/**
 * File contains builders and interfaces for end-user backgrounds.
 */
/**
 * Collection of available *UIBackground*s. Can be used to customize the *background* of an *UIElement*.
 *
 * *Background* must be specified when the *UIElement* is created by method of its *builder*.
 *
 * Example usage:
 *
 * | Desired result                                 | Usage                                                                                         |
 * | :--------------------------------------------- | :-------------------------------------------------------------------------------------------- |
 * | Create *TextBox* with specified *Background*   | *Chart*.addUIElement(*UIElementBuilders.TextBox*.setBackground(**UIBackgrounds.Circle**))     |
 */
export declare const UIBackgrounds: {
    /**
     * No background.
     */
    None: typeof UIEmptyBackground;
    /**
     * Rectangular background.
     */
    Rectangle: typeof UIRectangle;
    /**
     * Circular background.
     */
    Circle: typeof UICircle;
    /**
     * 45 degree rotated rectangle background.
     */
    Diamond: typeof UIDiamond;
    /**
     * Arrow-like background.
     *
     * The *Pointers* direction can be modified by, for example:
     *
     * *UIElement*.setBackground((pointer) => pointer.setDirection(**UIDirections.Up**))
     *
     * This will throw an *error* if used on an *UIElement* with any other *Background*!
     */
    Pointer: typeof UIPointer;
};
/**
 * File contains builders and interfaces for end-user button pictures.
 */
/**
 * Collection of available *UIButtonPicture*s. Can be used to customize the shape of buttons and checkboxes of *UIElements*.
 *
 * *ButtonPicture* must be specified when the *UIElement* is created by method of its *builder*.
 *
 * Example usage:
 *
 * | Desired result                                 | Usage                                                                                                                                             |
 * | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
 * | Create *ButtonBox* with specified *ButtonPicture* | *Chart*.addUIElement(*UIElementBuilders.ButtonBox*.setPictureOff(**UIButtonPictures.Circle**))                                                 |
 * | Create *LegendBox* with specified *ButtonPicture* | *Chart*.addUIElement(*UIElementBuilders.HorizontalLegendBox*.setEntry(*UIElementBuilders.TextBox*.setPictureOff(**UIButtonPictures.Circle**))) |
 */
export declare const UIButtonPictures: {
    /**
     * Rectangular picture.
     */
    Rectangle: typeof UIRectangle;
    /**
     * Circular picture.
     */
    Circle: typeof UICircle;
    /**
     * 45 degree rotated rectangle picture.
     */
    Diamond: typeof UIDiamond;
};
/**
 * File contains user reference for cursor and marker builders.
 */
/**
 * Collection of *StaticCursorBuilders*.
 *
 * *StaticCursorBuilder*s are used to modify structure of *Markers*, by passing one when the *Marker* is created.
 *
 * Each item is associated with a specific *Chart*-type, that it can only be used with.
 */
export declare const MarkerBuilders: {
    /**
     * *StaticCursorBuilder* for creation of *MarkerXY*.
     *
     * Used to modify structure of *MarkerXY* when it is created. There are two versions of *MarkerXY*:
     * - *ChartMarkerXY* created with *ChartXY*.**addChartMarkerXY()**
     * - *SeriesMarkerXY* created with *SeriesXY*.**addMarker()**
     */
    XY: StaticCursorXYBuilder<PointMarker, UIBackground, PointableBackground, PointableBackground>;
};
/**
 * Collection of *AutoCursorBuilders*.
 *
 * *AutoCursorBuilder*s are used to modify structure of *AutoCursor*s of *Chart*s, by passing one when the *Chart* is created.
 *
 * Each item is associated with a specific *Chart*-type, that it can only be used with.
 */
export declare const AutoCursorBuilders: {
    /**
     * *AutoCursorBuilder* for *ChartXY*.
     *
     * Used to modify structure of *AutoCursor*, by passing one when creating a *ChartXY*.
     */
    XY: AutoCursorXYBuilder<PointMarker, UIBackground, PointableBackground, PointableBackground>;
    /**
     * *AutoCursorBuilder* for *SpiderChart*.
     *
     * Used to modify structure of *AutoCursor*, by passing one when creating a *SpiderChart*.
     */
    Spider: AutoCursor2DBuilder<PointMarker, UIBackground>;
};
/**
 * File contains builders and interfaces for end-user uiElements.
 */
/**
 * Collection of available *UIElement* *builders*. To build *UIElement*s you must pass one of these to method: **addUIElement()**.
 * This method can be accessed through *Charts*, *Dashboard*, Etc.
 *
 * Example usage:
 *
 * | Desired result                         | Usage                                                     |
 * | :------------------------------------- | :-------------------------------------------------------- |
 * | Create a *TextBox* on a *ChartXY*      | *ChartXY*.addUIElement(**UIElementBuilders.TextBox**)     |
 * | Create a *CheckBox* on a *Dashboard*   | *Dashboard*.addUIElement(**UIElementBuilders.CheckBox**)  |
 */
export declare const UIElementBuilders: {
    /**
     * *UIElement* that displays text over a *Background*.
     *
     * By default, *Background* is empty. To show it you must specify it using method of the *builder*, **setBackground**
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                                     |
     * | :--------------------------------------------- | :---------------------------------------------------------------------------------------- |
     * | Create a *TextBox*                             | *Chart*.addUIElement(**UIElementBuilders.TextBox**)                                       |
     * | Create a *TextBox* with specified *Background* | *Chart*.addUIElement(*UIElementBuilders*.TextBox.**setBackground(UIBackgrounds.Circle)**) |
     */
    TextBox: UITextBoxBuilder<UIBackground>;
    /**
     * *UIElement* that displays a toggleable checkbox and text over a *Background*.
     *
     * By default, *Background* is empty. To show it you must specify it using method of the *builder*, **setBackground**
     *
     * Example usage:
     *
     * | Desired result                                     | Usage                                                                                             |
     * | :------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
     * | Create a *CheckBox*                                | *Chart*.addUIElement(**UIElementBuilders.CheckBox**)                                              |
     * | Create a *CheckBox* with specified *Background*    | *Chart*.addUIElement(*UIElementBuilders*.CheckBox.**setBackground(UIBackgrounds.Circle)**)        |
     * | Create a *CheckBox* with specified *ButtonPicture* | *Chart*.addUIElement(*UIElementBuilders*.CheckBox.**setPictureOff(UIButtonPictures.Diamond)**)    |
     */
    CheckBox: UICheckBoxBuilder<UIBackground, UIButtonPicture, UIButtonPicture>;
    /**
     * *UIElement* that displays a button and text over a *Background*.
     *
     * By default, *Background* is empty. To show it you must specify it using method of the *builder*, **setBackground**
     *
     * Example usage:
     *
     * | Desired result                                         | Usage                                                                                             |
     * | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
     * | Create a *ButtonBox*                                   | *Chart*.addUIElement(**UIElementBuilders.ButtonBox**)                                             |
     * | Create a *ButtonBox* with specified *Background*       | *Chart*.addUIElement(*UIElementBuilders*.ButtonBox.**setBackground(UIBackgrounds.Circle)**)       |
     * | Create a *ButtonBox* with specified *ButtonPicture*    | *Chart*.addUIElement(*UIElementBuilders*.ButtonBox.**setPictureOff(UIButtonPictures.Diamond)**)   |
     */
    ButtonBox: UICheckBoxBuilder<UIBackground, UIButtonPicture, UIButtonPicture>;
    /**
     * *UIElement* that displays text over a *Pointable* *Background*.
     *
     * Direction can be changed with *PointableTextBox*.**setDirection()**
     *
     * Example usage:
     *
     * | Desired result                                                     | Usage                                                                                     |
     * | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
     * | Create a *PointableTextBox*                                        | *Chart*.addUIElement(**UIElementBuilders.PointableTextBox**)                              |
     * | Create a *PointableTextBox* with specified *PointableBackground*   | ~~Not supported~~ there is currently only one implementation of *PointableBackground*     |
     */
    PointableTextBox: UIPointableTextBoxBuilder<PointableBackground>;
};
/**
 * Collection of available *LegendBox* *builders*. To build *LegendBox*es you must pass one of these to method: **addLegendBox()**.
 * This method can be accessed through *Charts*, *Dashboard*, Etc.
 *
 * Example usage:
 *
 * | Desired result                         | Usage                                                     |
 * | :------------------------------------- | :-------------------------------------------------------- |
 * | Create a *HorizontalLegendBox* on a *ChartXY*      | *ChartXY*.addLegendBox(**LegendBoxBuilders.TextBox**)     |
 * | Create a *HorizontalLegendBox* on a *Dashboard*   | *Dashboard*.addLegendBox(**LegendBoxBuilders.CheckBox**)  |
 */
export declare const LegendBoxBuilders: {
    /**
     * Horizontal implementation of *LegendBox*.
     *
     * Lays out each unique *group* after one another **horizontally**. Items inside each *group* are layed out vertically.
     *
     * Example usage:
     *
     * | Desired result                                         | Usage                                                                                             |
     * | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
     * | Create a *Horizontal LegendBox*                        | *Chart*.addUIElement(**UIElementBuilders.HorizontalLegendBox**)
     */
    HorizontalLegendBox: UILegendBoxBuilder<InternalBackground, UITextBox<UIBackground>, LegendBoxEntry>;
    /**
     * Vertical implementation of *LegendBox*.
     *
     * Lays out each unique *group* after one another **vertically**. Items inside each *group* are layed out horizontally.
     *
     * Example usage:
     *
     * | Desired result                                         | Usage                                                                                             |
     * | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
     * | Create a *Vertical LegendBox*                          | *Chart*.addUIElement(**UIElementBuilders.VerticalLegendBox**)
     */
    VerticalLegendBox: UILegendBoxBuilder<InternalBackground, UITextBox<UIBackground>, LegendBoxEntry>;
};
/**
 * File contains builders and interfaces for end-user layouts.
 */
/**
 * Collection of *UIElementBuilder*s for *Layout*s. These allow positioning multiple *UIElements* relative to each other.
 */
export declare const UILayoutBuilders: {
    /**
     * *UIElement* for column layout, added *UIElements* will be layed out after one another **vertically**. Has a *Background*.
     *
     * By default, *Background* is hidden (style = *emptyFill*). To show it you must give it a style with: *UIColumn*.**setFillStyle()**
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                             |
     * | :--------------------------------------------- | :-------------------------------------------------------------------------------- |
     * | Create a *Column*                              | *Chart*.addUIElement(**UILayouts.Column**)                                        |
     * | Create a *Column* with specified *Background*  | *Chart*.addUIElement(*UILayouts*.Column.**setBackground(UIBackgrounds.Circle)**)  |
     */
    Column: UIColumnBuilder<UIBackground>;
    /**
     * *UIElement* for row layout, added *UIElements* will be layed out after one another **horizontally**. Has a *Background*.
     *
     * By default, *Background* is hidden (style = *emptyFill*). To show it you must give it a style with: *UIRow*.**setFillStyle()**
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                             |
     * | :--------------------------------------------- | :-------------------------------------------------------------------------------- |
     * | Create a *Row*                                 | *Chart*.addUIElement(**UILayouts.Row**)                                           |
     * | Create a *Row* with specified *Background*     | *Chart*.addUIElement(*UILayouts*.Row.**setBackground(UIBackgrounds.Circle)**)     |
     */
    Row: UIRowBuilder<UIBackground>;
};
/**
 * File contains builders and interfaces for end-user cursor pointMarkers.
 */
/**
 * Collection of available *PointMarker* implementations.
 *
 * *PointMarker*s are interactable *UIElement*s that belong to *AutoCursor*s and *Marker*s, indicating their location.
 *
 * *PointMarker* can be specified when creating an *AutoCursor* or *Marker*, by method of their *builder*.
 *
 * Example usage:
 *
 * | Desired result                                         | Usage                                                                                                                 |
 * | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
 * | Create *SeriesMarkerXY* with specified *PointMarker*   | *SeriesXY*.addMarker(*MarkerBuilders.XY*.setPointMarker(**PointMarkers.UICircle**))                                   |
 * | Specify *PointMarker* of *AutoCursor*                  | *LightningChart*.ChartXY({ autoCursorBuilder: *AutoCursorBuilders.XY*.setPointMarker(**PointMarkers.UIDiamond**) })   |
 */
export declare const PointMarkers: {
    /**
     * No pointMarker.
     */
    None: typeof EmptyPointMarker;
    /**
     * Rectangular pointMarker.
     */
    UIRectangle: typeof UIRectangle;
    /**
     * Circular pointMarker.
     */
    UICircle: typeof UICircle;
    /**
     * 45 degree rotated rectangle pointMarker.
     */
    UIDiamond: typeof UIDiamond;
};
/**
 * File contains the logic for an abstract Funnel Chart.
 * The rendering logic of a "Funnel" is abstract and defined in a sub-class of this.
 */
/**
 * Type of a FunnelChart constructor.
 * @hidden
 */
export declare type FunnelChartConstructor<T extends FunnelChart> = new (layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number) => T;
/**
 * Abstract base class for *Funnel Charts*.
 * Visualizes proportions and percentages between categories, by dividing a funnel into proportional segments.
 *
 * Set data using *FunnelChart*.**addSlice( name: string, value: number )**
 *
 * There are multiple implementations of *FunnelChart*, each with their own visual design and *API* for customizing it.
 * List of selectable options can be found in: **FunnelChartTypes**
 */
export declare abstract class FunnelChart extends Chart implements SlicedCharts<FunnelSlice> {
    /**
     * This method is used for the adding slices in the funnel chart.
     * @param titile Funnel slice title
     * @param value  funnel slice value
     */
    addSlice(title: string, value: number): FunnelSlice;
    /**
     * This method is used for the adding multiple slices in the funnel chart.
     * @param slices Array of slices
     */
    addSlices(slices: {
        name: string;
        value: number;
    }[]): Array<FunnelSlice>;
    /**
     * Get all Slices of Funnel Chart.
     * NOTE: Manual modifications to returned Array can have unforeseen side-effects.
     * Removing or adding Slices is intended to be done using other APIs (FunnelChart.addSlice, Slice.dispose, ...)
     * @return  Array of Slices
     */
    getSlices(): FunnelSlice[];
    /**
     * Set Funnel Head Width
     * @param  headWidth   Funnel Head Width range from 0 to 100
     * @return             Funnel Chart itself
     */
    setHeadWidth(headWidth: number): this;
    /**
     * Get Funnel Head Width
     * @return  number (0 - 100)
     */
    getHeadWidth(): number;
    /**
     * Set Funnel Neck Width
     * @param neckWidth Funnel Neck Width range from 0 to 100
     * @return          Funnel Chart itself
     */
    setNeckWidth(neckWidth: number): this;
    /**
     * Get Funnel Neck Width
     * @return  number (0 - 100)
     */
    getNeckWidth(): number;
    /**
     * Set gap between Slice / start of label connector, and end of label connector / Label.
     * @param   sliceGap   Gap as pixels. Clamped between [0, 20] !
     * @return             Funnel Chart itself
     */
    setSliceGap(sliceGap: pixel): this;
    /**
     * Set FunnelSliceMode. Can be used to select between different drawing approaches for Slices.
     *
     * See **FunnelSliceModes** for a collection of options.
     * @param   sliceMode   FunnelSliceMode
     * @return              Funnel Chart itself
     */
    setSliceMode(sliceMode: FunnelSliceModes): this;
    /**
     * Get FunnelSliceMode. Can be used to select between different drawing approaches for Slices.
     *
     * See **FunnelSliceModes** for a collection of options.
     * @return  FunnelSliceMode
     */
    getFunnelSliceMode(): FunnelSliceModes;
    /**
     * Set style of Funnel Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Funnel will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Funnel Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @param   sliceFillStylePalette   Palette for FillStyle objects
     * @return                          Funnel Chart itself
     */
    setSliceFillStyle(sliceFillStylePalette: Palette<FillStyle>): this;
    /**
     * Get style of Funnel Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Funnel will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Funnel Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @return  Palette<FillStyle>
     */
    getSliceFillStyle(): Palette<FillStyle>;
    /**
     * Set style of Funnel Slices Stroke.
     * @param   value   LineStyle object or function which creates a new style based on previous
     * @return          Funnel Chart itself
     */
    setSliceStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of Funnel Slices Stroke.
     * @return  LineStyle object
     */
    getSliceStrokeStyle(): LineStyle;
    /**
     * Set sorter of Funnels' Slices as a comparator-function.
     *
     * For some commonly needed default implementations, can refer to SliceSorters-collection.
     * @param   sliceSorter SliceSorter - function which sorts Slices of Funnel with JavaScript API: Array.sort.
     * @return              Funnel Chart itself
     */
    setSliceSorter(sliceSorter: SliceSorter<FunnelSlice>): this;
    /**
     * Get sorter of Funnels' Slices as a comparator-function.
     * @return  SliceSorter - function which sorts Slices of Funnel with JavaScript API: Array.sort.
     */
    getSliceSorter(): SliceSorter<FunnelSlice>;
    /**
     * Set fill style of Funnel Slices Labels.
     * @param   value   FillStyle object or function which creates a new style based on previous
     * @return          Funnel Chart itself
     */
    setLabelFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Funnel Slice Labels.
     * @return  FillStyle object
     */
    getLabelFillStyle(): FillStyle;
    /**
     * Set font of Slice Labels.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Funnel Chart itself
     */
    setLabelFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Slice Labels.
     * @return  FontSettings
     */
    getLabelFont(): FontSettings;
    /**
     * Set formatter of Slice Labels.
     *
     * See FunnelSliceLabelFormatters for a collection of default options.
     * @param   labelFormatter  SliceLabelFormatter - function which generates text of Labels per Slice.
     * @return                  Funnel Chart itself
     */
    setLabelFormatter(labelFormatter: SliceLabelFormatter<FunnelSlice>): this;
    /**
     * Get formatter of Slice Labels.
     * @return  SliceLabelFormatter - function which generates text of Labels per Slice.
     */
    getLabelFormatter(): SliceLabelFormatter<FunnelSlice>;
    /**
     * Sets if animations are enabled or not.
     * @param   animationsEnabled   Boolean state for animations enabled
     * @return                      Funnel Chart itself
     * @hidden
     */
    setAnimationsEnabled(animationsEnabled: boolean): this;
    /**
     * Gets if animations are enabled or not.
     * @return  Boolean state for animations enabled
     * @hidden
     */
    getAnimationsEnabled(): boolean;
}
/**
 * Enum for selecting different drawing approaches for *FunnelChart*.
 *
 * Use with *FunnelChart*.**setSliceMode()**
 */
export declare enum FunnelSliceModes {
    /**
     * Slices **height** represents its relative value inside the Funnel Chart.
     */
    VariableHeight = 0,
    /**
     * Slices **width** represents its relative value inside the Funnel Chart.
     */
    VariableWidth = 1
}
/**
 * File contains different implementations of Funnel Charts, each with their own rendering logic.
 */
/**
 * *Funnel Chart* implementation that draws Slice Labels on its left and right sides.
 * Slices and Labels are connected by 'label connector lines'.
 */
export declare class FunnelChartWithLabelsOnSides extends FunnelChart {
    /**
     * Set style of Label connector lines.
     * @param   labelConnectorStyle LineStyle object
     * @return                      Funnel Chart itself
     */
    setLabelConnectorStyle(labelConnectorStyle: LineStyle): this;
    /**
     * Get style of Label connector lines.
     * @return  LineStyle object
     */
    getLabelConnectorStyle(): LineStyle;
    /**
     * Set gap between Slice / start of label connector, and end of label connector / Label.
     * @param   labelConnectorGap   Gap as pixels
     * @return                      Funnel Chart itself
     */
    setLabelConnectorGap(labelConnectorGap: pixel): this;
    /**
     * Get gap between Slice / start of label connector, and end of label connector / Label.
     * @return  Gap as pixels
     */
    getLabelConnectorGap(): number;
    /**
     * Set the side where label should display
     * @param   labelSide   Left /Right
     * @return              Funnel Chart itself
     */
    setLabelSide(labelSide: FunnelLabelSide): this;
    /**
     * Get the side where label shown
     * @return The label side
     */
    getLabelSide(): FunnelLabelSide;
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Point minimum size or undefined if unimplemented
     */
    getMinimumSize(): Point | undefined;
}
/**
 * *Funnel Chart* implementation that draws Slice Labels inside the Slices.
 * Works well when Label texts are short and there are not a lot of Slices, as the actual Funnel has more space.
 */
export declare class FunnelChartWithLabelsInsideSlices extends FunnelChart {
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return      Point
     */
    getMinimumSize(): Point | undefined;
}
/**
 * Interface that can be used to define *Funnel Chart* configurations that can't be changed after creation.
 *
 * Example usage:
 *
 * | Desired result                         | Value                                                   |
 * | :------------------------------------- | :-------------------------------------------------------|
 * | Funnel Chart with default type         | *undefined*                                             |
 * | Funnel Chart with specified type       | { **type:** *FunnelChartTypes*.LabelsOnSides }          |
 */
export interface FunnelChartOptions<FunnelChartType extends FunnelChartTypes> {
    /**
     * Interface for specifying desired "type" of Funnel Chart.
     * This can be used to select different rendering approaches, mainly reflecting how Slice Labels are positioned.
     *
     * Options are located in **FunnelChartTypes**-collection. If undefined, will default to *FunnelChartWithLabelsOnSides*.
     */
    type?: FunnelChartType;
}
/**
 * Available Funnel Chart types
 * @hidden
 */
export declare type FunnelChartTypes = typeof FunnelChartTypes[keyof typeof FunnelChartTypes];
/**
 * Collection of *FunnelChart* implementations. Each option can have their own visual design, and *API* for customization of it.
 *
 * This must be specified when the *FunnelChart* is created (or default one will be used).
 *
 * Example usage:
 *
 * | Desired result                                 | Usage                                                                         |
 * | :--------------------------------------------- | :-----------------------------------------------------------------------------|
 * | Create a *FunnelChart* with default type       | *LightningChart*.Funnel()                                                     |
 * | Create a *FunnelChart* with specified type     | *LightningChart*.Funnel({ type: **FunnelChartTypes.LabelsInsideSlices** })    |
 */
export declare const FunnelChartTypes: {
    /**
     * Funnel Chart type, where Slice Labels are positioned on the either left or right sides of Chart.
     * The side can be set using setLabelSide
     * Labels are connected to their Slices with lines, which can be styled using unique API for this Funnel Chart type.
     */
    LabelsOnSides: typeof FunnelChartWithLabelsOnSides;
    /**
     * Funnel Chart type, where Slice Labels inside the Slices.
     */
    LabelsInsideSlices: typeof FunnelChartWithLabelsInsideSlices;
};
/**
 * Options for selecting side of labels in a *FunnelChartWithLabelsOnSides*.
 *
 * Use with *FunnelChartWithLabelsOnSides*.**setLabelSide()**
 */
export declare enum FunnelLabelSide {
    /**
     * Label Side  - Right
     */
    Right = 0,
    /**
     * Label Side  - Left
     */
    Left = 1
}
/**
 * Possible Shape types for parts of a Slice.
 */
declare type FunnelSliceVisual = Polygon | Text;
/**
 * Class that represents a single Slice of a Funnel Chart.
 * It is given to users when a Slice is added.
 */
export declare abstract class FunnelSlice extends Slice<FunnelSliceVisual> {
    /**
     * Set value of Slice.
     * @param   value   Numeric value
     * @return          Slice itself
     */
    abstract setValue(value: number): this;
    /**
     * Get value of Slice.
     * @return          Numeric value
     */
    abstract getValue(): number;
}
/**
 * Internal class that hides some internal interfaces of a Slice that are only needed for interactions with the owning Funnel Chart.
 * @hidden
 */
export declare class InternalFunnelSlice extends FunnelSlice {
    protected _chart: FunnelChart;
    readonly scale: Vec2<Scale>;
    protected _removeFromChart: RemoveHandler<FunnelSlice>;
    protected _restoreFromChart: RestoreHandler<FunnelSlice>;
    /**
     * Index of Slice inside its owning Chart.
     * It tells how many Slices were created before this one.
     * It is not updated for disposed Slices, and so cannot be used for counting the amount of existing Slices.
     */
    readonly index: number;
    /**
     * @param   index               Index of Slice
     * @param    polygonLayer       Rendering layer for Polygon
     * @param    labelLayer         Rendering layer for Label
     * @param    _chart             Owning chart
     * @param    scale              Rendering scale
     * @param   _removeFromChart    Remove handler for Slice
     * @param    _restoreFromChart  Restore handler for Slice
     * @hidden
     */
    constructor(index: number, polygonLayer: LayerXY, labelLayer: LayerXY, _chart: FunnelChart, scale: Vec2<Scale>, _removeFromChart: RemoveHandler<FunnelSlice>, _restoreFromChart: RestoreHandler<FunnelSlice>);
    /**
     * Set value of Slice.
     * @param   value   Numeric value
     * @return          Slice itself
     */
    setValue(value: number): this;
    /**
     * Get value of Slice.
     * @return          Numeric value
     */
    getValue(): number;
    /**
     * Tell the owning chart to remove this component.
     * @return  Slice itself.
     */
    dispose(): this;
    /**
     * Tell the owning chart to restore this series.
     * @return  Slice itself.
     */
    restore(): this;
    /**
     * Method that owning Funnel Chart uses to assign style of a Slice it owns.
     * @param   polygonFillStyle    FillStyle for Polygon
     * @param   polygonStrokeStyle  LineStyle for Polygon
     * @param   labelFillStyle  FillStyle for Label
     * @param   labelFont       FontSettings for Label
     */
    setStyle(polygonFillStyle: FillStyle, polygonStrokeStyle: LineStyle, labelFillStyle: FillStyle, labelFont: FontSettings): void;
    /**
     * Get animated value of Slice.
     * When value of Slice is changed, the animated value will not update immediately, but after an animation.
     * (if animations are not disabled).
     * @return  Animated value
     */
    getAnimatedValue(): number;
    /**
     * Attach series to an annotation.
     * @param entry Object which has to be attached
     * @return      Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Enable or disable forced highlighting of series
     * @param highLight True for enabled and false for disabled
     * @returns         Series itself for fluent interface
     */
    setHighlighted(highLight: boolean): this;
    /**
     * Method styles an attached entry according to Slice itself.
     */
    protected styleAttachedEntry(entry: LegendBoxEntry): void;
}
export {};
/**
 * Interval object defines the minimum and maximum slice interval.
 */
export interface SliceInterval {
    min: number;
    max: number;
}
/**
 * Abstract base class for *Gauge Charts*.
 * Gauge charts indicate where your data point(s) falls over a particular range.
 * This chart type is often used in executive dashboard reports to show key business indicators.
 *
 * There are multiple implementations of *GaugeChart*, each with their own visual design and *API* for customizing it.
 * List of selectable options can be found in: **GaugeChartTypes**
 */
export declare abstract class GaugeChart<PublicSlice extends GaugeSlice = GaugeSlice, InternalSlice extends GaugeSlice = any> extends Chart {
    /**
     * @param   layerSupplier       LayerSupplier. Must NOT be cached, because it contains reference to actual Engine instance.
     * @param   logoFactory         Logo factory.
     * @param   ScaleX              Injectable Scale constructor
     * @param   ScaleY              Injectable Scale constructor
     * @param   onScaleChange       Injectable subscribe method for when chart should update its positioning logic (used for dashboard)
     * @param   panelMargin         Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number);
    /**
     * Sets if animations are enabled or not.
     * @param   animationsEnabled   Boolean state for animations enabled
     * @returns                     Gauge itself for fluent interface.
     */
    setAnimationsEnabled(animationsEnabled: boolean): this;
    /**
     * Gets if animations are enabled or not.
     * @return  Boolean state for animations enabled
     */
    getAnimationsEnabled(): boolean;
}
/**
 * Type of a GaugeChart constructor.
 * @hidden
 */
export declare type GaugeChartConstructor<T extends GaugeChart> = new (layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number) => T;
/**
 * Interface that can be used to define *Gauge Chart* configurations that can't be changed after creation.
 *
 * Example usage:
 *
 * | Desired result                         | Value                                           |
 * | :------------------------------------- | :-----------------------------------------------|
 * | Gauge Chart with default type          | *undefined*                                     |
 * | Gauge Chart with specified type        | { **type:** *GaugeChartTypes*.Solid }           |
 */
export interface GaugeChartOptions<GaugeChartType extends GaugeChartTypes> {
    /**
     * Interface for specifying desired "type" of Gauge Chart.
     * This can be used to select different gauge types.
     *
     * Options are located in **GaugeChartTypes**-collection. If undefined, will default to Solid.
     */
    type?: GaugeChartType;
}
/**
 * Available Gauge Chart types.
 */
export declare type GaugeChartTypes = typeof GaugeChartTypes[keyof typeof GaugeChartTypes];
/**
 * Collection of *GaugeChart* implementations. Each option can have their own visual design, and *API* for customization of it.
 *
 * This must be specified when the *GaugeChart* is created (or default one will be used).
 *
 * Example usage:
 *
 * | Desired result                             | Usage                                                                     |
 * | :------------------------------------------| :------------------------------------------------------------------------ |
 * | Create a *GaugeChart* with specified type  | *LightningChart*.Gauge({ type: **GaugeChartTypes.Solid** })  |
 */
export declare const GaugeChartTypes: {
    /**
     * Solid Gauge Chart type, which contains a single slice represents a value within the interval.
     */
    Solid: typeof SolidGauge;
};
/**
 * Value change event listener.
 * @param slice     Slice
 * @param previous  Previous slice value
 * @param next      Next slice value
 */
export declare type ValueChangeEventListener<S extends GaugeSlice> = (slice: S, previous: number, next: number) => void;
/**
 * Interval change event listener.
 * @param slice     Slice
 * @param previous  Previous slice interval
 * @param next      Next slice interval
 */
export declare type IntervalChangeEventListener<S extends GaugeSlice> = (slice: S, previous: SliceInterval, next: SliceInterval) => void;
/**
 * Abstract class of Gauge slice.
 * The slice can be represented as a single or multiples shapes.
 */
export declare abstract class GaugeSlice<GaugeSliceVisual extends ChartVisual = ChartVisual> extends Slice<GaugeSliceVisual> {
    /**
     * Set scale interval.
     * @param  start                Start scale value
     * @param  end                  End scale value
     * @returns Slice for fluent interface
     */
    abstract setInterval(start: number, end: number): this;
    /**
     * Set font of interval labels.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                          |
     * | :--------------------- | :------------------------------------------------ |
     * | Specified FontSettings | new FontSettings({ size: 24, style: 'italic' })   |
     * | Set to **bold**        | (fontSettings) => fontSettings.setWeight('bold')  |
     *
     * @param   value   Either a FontSettings object or a function, which will be used to create a new FontSettings based on current value.
     * @returns         Chart itself
     */
    abstract setIntervalLabelsFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of gauge interval labels.
     * @returns         FontSettings object for gauge interval lables.
     */
    abstract getIntervalLabelsFont(): FontSettings;
    /**
     * Set interval labels visibility enabled or disabled.
     * @param state True - labels are enabled, otherwise - disabled.
     * @returns     Slice itself for fluent interface.
     */
    abstract setIntervalLabelsVisible(state: boolean): this;
    /**
     * Get interval labels visibility state.
     * @returns True - labels are enabled, otherwise - disabled.
     */
    abstract getIntervalLabelsVisible(): boolean;
    /**
     * Remove subscription from value change event
     * @param token Event listener
     * @returns True if the listener is successfully removed and false if it is not found
     */
    offValueChange(token: Token): boolean;
    /**
     * Remove subscription from interval change event
     * @param token Event listener
     * @returns True if the listener is successfully removed and false if it is not found
     */
    offIntervalChange(token: Token): boolean;
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
}
/**
 * File contains the logic for an abstract Pie Chart.
 * The rendering logic of a "Pie" is abstract and defined in a sub-class of this.
 */
/**
 * Type of a PieChart constructor.
 * @hidden
 */
export declare type PieChartConstructor<T extends PieChart> = new (layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number) => T;
/**
 * Abstract base class for *Pie Charts*.
 * Visualizes proportions and percentages between categories, by dividing a circle into proportional segments.
 *
 * Set data using *PieChart*.**addSlice( name: string, value: number )**
 *
 * There are multiple implementations of *PieChart*, each with their own visual design and *API* for customizing it.
 * List of selectable options can be found in: **PieChartTypes**
 */
export declare abstract class PieChart extends Chart implements SlicedCharts<PieSlice> {
    /**
     * Add new Slice to the Pie Chart.
     * The Slice will be automatically assigned an unique style (using SliceFillStylePalette),
     * that will not be affected by sorting of Slices.
     *
     * Currently there is no way to override the indiviudal style of a Slice - style modifications must be done using the API of Pie Chart.
     *
     * @param   name    Initial name for Slice as string.
     * @param   value   Initial value for Slice as number.
     * @return          New Slice object.
     */
    addSlice(name: string, value: number): PieSlice;
    /**
     * This method is used for the adding multiple slices in the funnel chart.
     * @param multiSlice Array of slices
     */
    addSlices(multiSlice: {
        name: string;
        value: number;
    }[]): Array<PieSlice>;
    /**
     * Get all Slices of Pie Chart.
     * NOTE: Manual modifications to returned Array can have unforeseen side-effects.
     * Removing or adding Slices is intended to be done using other APIs (PieChart.addSlice, Slice.dispose, ...)
     * @return  Array of Slices
     */
    getSlices(): PieSlice[];
    /**
     * Set if it is allowed for multiple Slices to be 'exploded' at the same time or not.
     * When a Slice is exploded, it is drawn differently from non-exploded state
     * - usually slightly "pushed away" from the center of Pie Chart.
     *
     * Does not affect state of already exploded Slices!
     * @param   multipleSliceExplosionAllowed   Is behaviour allowed as boolean flag
     * @return                                  Pie Chart itself
     */
    setMultipleSliceExplosion(multipleSliceExplosionAllowed: boolean): this;
    /**
     * Get a boolean flag which implies whether it is allowed for multiple Slices to be 'exploded' at the same time or not.
     * When a Slice is exploded, it is drawn differently from non-exploded state
     * - usually slightly "pushed away" from the center of Pie Chart.
     * @return  Is behaviour allowed as boolean flag
     */
    getMultipleSliceExplosion(): boolean;
    /**
     * Set inner radius of Pie Chart.
     * This method can be used to style the Pie Chart as a "Donut Chart", with the center being hollow.
     * @param   innerRadius     Inner radius as a percentage of outer radius [0, 100]
     * @return                  Pie Chart itself
     */
    setInnerRadius(innerRadius: number): this;
    /**
     * Get inner radius of Pie Chart..
     * This property can be used to style the Pie Chart as a "Donut Chart", with the center being hollow.
     * @return  Inner radius as a percentage of outer radius [0, 100]
     */
    getInnerRadius(): number;
    /**
     * Set offset of exploded Slices in pixels.
     * @param   sliceExplosionOffset    Offset of exploded Slices in pixels
     * @return                          Pie Chart itself
     */
    setSliceExplosionOffset(sliceExplosionOffset: pixel): this;
    /**
     * Get offset of exploded Slices in pixels.
     * @return  Offset of exploded Slices in pixels
     */
    getSliceExplosionOffset(): pixel;
    /**
     * Set style of Pie Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Pie will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Pie Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @param   sliceFillStylePalette   Palette for FillStyle objects
     * @return                          Pie Chart itself
     */
    setSliceFillStyle(sliceFillStylePalette: Palette<FillStyle>): this;
    /**
     * Get style of Pie Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Pie will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Pie Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @return  Palette<FillStyle>
     */
    getSliceFillStyle(): Palette<FillStyle>;
    /**
     * Set stroke style of Pie Slices border.
     * @param   value   LineStyle object or function which creates a new style based on previous
     * @return          Pie Chart itself
     */
    setSliceStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of Pie Slices border.
     * @return  LineStyle object
     */
    getSliceStrokeStyle(): LineStyle;
    /**
     * Set sorter of Pies' Slices as a comparator-function.
     *
     * For some commonly needed default implementations, can refer to PieSliceSorters-collection.
     * @param   sliceSorter PieSliceSorter - function which sorts Slices of Pie with JavaScript API: Array.sort.
     * @return              Pie Chart itself
     */
    setSliceSorter(sliceSorter: SliceSorter<PieSlice>): this;
    /**
     * Get sorter of Pies' Slices as a comparator-function.
     * @return  PieSliceSorter - function which sorts Slices of Pie with JavaScript API: Array.sort.
     */
    getSliceSorter(): SliceSorter<PieSlice>;
    /**
     * Set fill style of Pie Slices Labels.
     * @param   value   FillStyle object or function which creates a new style based on previous
     * @return          Pie Chart itself
     */
    setLabelFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Pie Slice Labels.
     * @return  FillStyle object
     */
    getLabelFillStyle(): FillStyle;
    /**
     * Set font of Slice Labels.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Pie Chart itself
     */
    setLabelFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Slice Labels.
     * @return  FontSettings
     */
    getLabelFont(): FontSettings;
    /**
     * Set formatter of Slice Labels.
     *
     * See PieSliceLabelFormatters for a collection of default options.
     * @param   labelFormatter  SliceLabelFormatter - function which generates text of Labels per Slice.
     * @return                  Pie Chart itself
     */
    setLabelFormatter(labelFormatter: SliceLabelFormatter<PieSlice>): this;
    /**
     * Get formatter of Slice Labels.
     * @return  SliceLabelFormatter - function which generates text of Labels per Slice.
     */
    getLabelFormatter(): SliceLabelFormatter<PieSlice>;
    /**
     * Sets if animations are enabled or not.
     * @param   animationsEnabled   Boolean state for animations enabled
     * @return                      Pie Chart itself
     */
    setAnimationsEnabled(animationsEnabled: boolean): this;
    /**
     * Gets if animations are enabled or not.
     * @return  Boolean state for animations enabled
     */
    getAnimationsEnabled(): boolean;
}
/**
 * File contains different implementations of Pie Charts, each with their own rendering logic.
 */
/**
 * *Pie Chart* implementation that draws Slice Labels on its left and right sides.
 * Slices and Labels are connected by 'label connector lines'.
 */
export declare class PieChartWithLabelsOnSides extends PieChart {
    /**
     * Set style of Label connector lines.
     * @param   labelConnectorStyle LineStyle object
     * @return                      Pie Chart itself
     */
    setLabelConnectorStyle(labelConnectorStyle: LineStyle): this;
    /**
     * Get style of Label connector lines.
     * @return  LineStyle object
     */
    getLabelConnectorStyle(): LineStyle;
    /**
     * Set length of label connector line for an exploded Slice. For non-exploded Slices, the length will be the sum of
     * this and explosion offset.
     * @param   labelConnectorLength    Length as pixels
     * @return                          Pie Chart itself
     */
    setLabelConnectorLength(labelConnectorLength: pixel): this;
    /**
     * Get length of label connector line for an exploded Slice. For non-exploded Slices, the length will be the sum of
     * this and explosion offset.
     * @return  Length as pixels
     */
    getLabelConnectorLength(): number;
    /**
     * Set gap between Slice / start of label connector, and end of label connector / Label.
     * @param   labelConnectorGap   Gap as pixels
     * @return                      Pie Chart itself
     */
    setLabelConnectorGap(labelConnectorGap: pixel): this;
    /**
     * Get gap between Slice / start of label connector, and end of label connector / Label.
     * @return  Gap as pixels
     */
    getLabelConnectorGap(): number;
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Vec2 minimum size or undefined if unimplemented
     */
    getMinimumSize(): Point | undefined;
}
/**
 * *Pie Chart* implementation that draws Slice Labels inside the Slices.
 * Works well when Label texts are short and there are not a lot of Slices, as the actual Pie has more space.
 * Public class
 */
export declare class PieChartWithLabelsInsideSlices extends PieChart {
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Vec2 minimum size or undefined if unimplemented
     */
    getMinimumSize(): Point | undefined;
    /**
     * Set position of Labels.
     * @param   labelPositionInsideSlice    Position of labels inside their respective Slices as a number between [0, 1]
     * @return                              Pie Chart itself
     */
    setLabelPosition(labelPositionInsideSlice: number): this;
    /**
     * Get position of Labels.
     * @return  Position of labels inside their respective Slices as a number between [0, 1]
     */
    getLabelPosition(): number;
}
/**
 * Interface that can be used to define *Pie Chart* configurations that can't be changed after creation.
 *
 * Example usage:
 *
 * | Desired result                         | Value                                                                 |
 * | :------------------------------------- | :-------------------------------------------------------------------- |
 * | Pie Chart with default type            | *undefined*                                                           |
 * | Pie Chart with specified type          | { **type:** *PieChartTypes*.PieChartWithLabelsOnSides }               |
 */
export interface PieChartOptions<PieChartType extends PieChartTypes> {
    /**
     * Interface for specifying desired "type" of Pie Chart.
     * This can be used to select different rendering approaches, mainly reflecting how Slice Labels are positioned.
     *
     * Options are located in **PieChartTypes**-collection. If undefined, will default to PieChartWithLabelsOnSides.
     */
    type?: PieChartType;
}
/**
 * Available Pie Chart types
 * @hidden
 */
export declare type PieChartTypes = typeof PieChartTypes[keyof typeof PieChartTypes];
/**
 * Collection of *PieChart* implementations. Each option can have their own visual design, and *API* for customization of it.
 *
 * This must be specified when the *PieChart* is created (or default one will be used).
 *
 * Example usage:
 *
 * | Desired result                             | Usage                                                                   |
 * | :------------------------------------------| :---------------------------------------------------------------------- |
 * | Create a *PieChart* with specified type    | *LightningChart*.Pie({ type: **PieChartTypes.LabelsInsideSlices** })    |
 */
export declare const PieChartTypes: {
    /**
     * Pie Chart type, where Slice Labels are positioned on the left and right sides of Chart.
     * Labels are connected to their Slices with lines, which can be styled using unique API for this Pie Chart type.
     */
    LabelsOnSides: typeof PieChartWithLabelsOnSides;
    /**
     * Pie Chart type, where Slice Labels inside the Slices.
     * Works well when Label texts are short and there are not a lot of Slices, as the actual Pie has more space.
     */
    LabelsInsideSlices: typeof PieChartWithLabelsInsideSlices;
};
/**
 * Possible Shape types for parts of a Slice.
 */
declare type PieSliceVisual = Arc | Text;
/**
 * Abstract class represents a Pie & Donut specific slice API.
 */
export declare abstract class PieSlice extends Slice<PieSliceVisual> {
    /**
     * Set is Slice exploded.
     * When a Slice is exploded, it is drawn differently from non-exploded state
     * - usually slightly "pushed away" from the center of Pie Chart.
     * @param   exploded    State of explosion as boolean
     * @return              Slice itself
     */
    abstract setExploded(exploded: boolean): this;
    /**
     * Get is Slice exploded.
     * When a Slice is exploded, it is drawn differently from non-exploded state
     * - usually slightly "pushed away" from the center of Pie Chart.
     * @return  State of explosion as boolean
     */
    abstract getExploded(): boolean;
}
/**
 * Internal class that hides some internal interfaces of a Slice that are only needed for interactions with the owning Pie Chart.
 * @hidden Internal class
 */
export declare class InternalPieSlice extends PieSlice {
    protected _chart: PieChart;
    readonly scale: Vec2<Scale>;
    protected _removeFromChart: RemoveHandler<PieSlice>;
    protected _restoreFromChart: RestoreHandler<PieSlice>;
    /**
     * Index of Slice inside its owning Chart.
     * It tells how many Slices were created before this one.
     * It is not updated for disposed Slices, and so cannot be used for counting the amount of existing Slices.
     */
    readonly index: number;
    /**
     * @param   index               Index of Slice
     * @param    arcLayer           Rendering layer for Arc
     * @param    labelLayer         Rendering layer for Label
     * @param    _chart             Owning chart
     * @param    scale              Rendering scale
     * @param   _removeFromChart    Remove handler for Slice
     * @param    _restoreFromChart  Restore handler for Slice
     * @hidden
    */
    constructor(index: number, arcLayer: LayerXY, labelLayer: LayerXY, _chart: PieChart, scale: Vec2<Scale>, _removeFromChart: RemoveHandler<PieSlice>, _restoreFromChart: RestoreHandler<PieSlice>);
    /**
     * Set value of Slice.
     * @param   value   Numeric value
     * @return          Slice itself
     */
    setValue(value: number): this;
    /**
     * Get value of Slice.
     * @return          Numeric value
     */
    getValue(): number;
    /**
     * Set is Slice exploded.
     * When a Slice is exploded, it is drawn differently from non-exploded state
     * - usually slightly "pushed away" from the center of Pie Chart.
     * @param   exploded    State of explosion as boolean
     * @return              Slice itself
     * @sideEffect          If set to true and Pie Chart multiple slice explosion is disabled,
     *                      this will unexplode any previously exploded Slices
     */
    setExploded(exploded: boolean): this;
    /**
     * Get is Slice exploded.
     * When a Slice is exploded, it is drawn differently from non-exploded state
     * - usually slightly "pushed away" from the center of Pie Chart.
     * @return  State of explosion as boolean
     */
    getExploded(): boolean;
    /**
     * Tell the owning chart to remove this component.
     * @return  Slice itself.
     */
    dispose(): this;
    /**
     * Tell the owning chart to restore this series.
     * @return  Slice itself.
     */
    restore(): this;
    /**
     * Method that owning Pie Chart uses to assign style of a Slice it owns.
     * @param   arcFillStyle    FillStyle for Arc
     * @param   arcStrokeStyle  LineStyle for Arc
     * @param   labelFillStyle  FillStyle for Label
     * @param   labelFont       FontSettings for Label
     */
    setStyle(arcFillStyle: FillStyle, arcStrokeStyle: LineStyle, labelFillStyle: FillStyle, labelFont: FontSettings): void;
    /**
     * Get animated value of Slice.
     * When value of Slice is changed, the animated value will not update immediately, but after an animation.
     * (if animations are not disabled).
     * @return  Animated value
     */
    getAnimatedValue(): number;
    /**
     * Get animated explosion state of Slice.
     * When state of Slice explosion is changed, this animated explosion value will move between 0 and 1 respectively,
     * but with an animation.
     * (if animations are not disabled).
     * @return  Animated value [0, 1]
     */
    getAnimatedExplosion(): number;
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Enable or disable forced highlighting of series
     * @param highLight True for enabled and false for disabled
     * @returns         Series itself for fluent interface
     */
    setHighlighted(highLight: boolean): this;
    /**
     * Method styles an attached entry according to Slice itself.
     */
    protected styleAttachedEntry(entry: LegendBoxEntry): void;
}
export {};
/**
 * File contains the logic for an abstract Pyramid Chart.
 * The rendering logic of a "Pyramid" is abstract and defined in a sub-class of this.
 */
/**
 * Type of a PyramidChart constructor.
 * @hidden
 */
export declare type PyramidChartConstructor<T extends PyramidChart> = new (layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number) => T;
/**
 * Abstract base class for *Pyramid Charts*.
 * Visualizes proportions and percentages between categories, by dividing a pyramid into proportional segments.
 *
 * Set data using *PyramidChart*.**addSlice( name: string, value: number )**
 *
 * There are multiple implementations of *PyramidChart*, each with their own visual design and *API* for customizing it.
 * List of selectable options can be found in: **PyramidChartTypes**
 */
export declare abstract class PyramidChart extends Chart implements SlicedCharts<PyramidSlice> {
    /**
     * This method is used for the adding slices in the pyramid chart.
     * @param titile Pyramid slice title
     * @param value  pyramid slice value
     */
    addSlice(title: string, value: number): PyramidSlice;
    /**
     * This method is used for the adding multiple slices in the pyramid chart.
     * @param slices Array of slices
     */
    addSlices(slices: {
        name: string;
        value: number;
    }[]): Array<PyramidSlice>;
    /**
     * Get all Slices of Pyramid Chart.
     * NOTE: Manual modifications to returned Array can have unforeseen side-effects.
     * Removing or adding Slices is intended to be done using other APIs (PyramidChart.addSlice, Slice.dispose, ...)
     * @return  Array of Slices
     */
    getSlices(): PyramidSlice[];
    /**
     * Set Pyramid Neck Width
     * @param neckWidth Pyramid Neck Width range from 0 to 100
     * @return          Pyramid Chart itself
     */
    setNeckWidth(neckWidth: number): this;
    /**
     * Get Pyramid Neck Width
     * @return  number (0 - 100)
     */
    getNeckWidth(): number;
    /**
     * Set gap between Slice / start of label connector, and end of label connector / Label.
     * @param   sliceGap   Gap as pixels. Clamped between [0, 20] !
     * @return             Pyramid Chart itself
     */
    setSliceGap(sliceGap: pixel): this;
    /**
     * Set PyramidSliceMode. Can be used to select between different drawing approaches for Slices.
     *
     * See **PyramidSliceModes** for a collection of options.
     * @param   sliceMode   PyramidSliceMode
     * @return              Pyramid Chart itself
     */
    setSliceMode(sliceMode: PyramidSliceModes): this;
    /**
     * Get PyramidSliceMode. Can be used to select between different drawing approaches for Slices.
     *
     * See **PyramidSliceModes** for a collection of options.
     * @return  PyramidSliceMode
     */
    getPyramidSliceMode(): PyramidSliceModes;
    /**
     * Set style of Pyramid Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Pyramid will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Pyramid Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @param   sliceFillStylePalette   Palette for FillStyle objects
     * @return                          Pyramid Chart itself
     */
    setSliceFillStyle(sliceFillStylePalette: Palette<FillStyle>): this;
    /**
     * Get style of Pyramid Slices fill.
     * This style is managed as a continuous Palette of FillStyle objects. Each Slice of Pyramid will be assigned an incremental index,
     * which will be used to pick its fill style from this Palette.
     *
     * So, for example... We have a Pyramid Chart with 5 Slices, and we give it a Palette with only 3 possible values
     * (0 = red, 1 = green, 2 = blue). The resulting Slice fill styles will be: red, green, blue, red, green.
     * Note that this means, that the supplied Palette will have to work in a continuous manner!
     *
     * @return  Palette<FillStyle>
     */
    getSliceFillStyle(): Palette<FillStyle>;
    /**
     * Set style of Pyramid Slices Stroke.
     * @param   value   LineStyle object or function which creates a new style based on previous
     * @return          Pyramid Chart itself
     */
    setSliceStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of Pyramid Slices Stroke.
     * @return  LineStyle object
     */
    getSliceStrokeStyle(): LineStyle;
    /**
     * Set sorter of Pyramids' Slices as a comparator-function.
     *
     * For some commonly needed default implementations, can refer to SliceSorters-collection.
     * @param   sliceSorter SliceSorter - function which sorts Slices of Pyramid with JavaScript API: Array.sort.
     * @return              Pyramid Chart itself
     */
    setSliceSorter(sliceSorter: SliceSorter<PyramidSlice>): this;
    /**
     * Get sorter of Pyramids' Slices as a comparator-function.
     * @return  SliceSorter - function which sorts Slices of Pyramid with JavaScript API: Array.sort.
     */
    getSliceSorter(): SliceSorter<PyramidSlice>;
    /**
     * Set fill style of Pyramid Slices Labels.
     * @param   value   FillStyle object or function which creates a new style based on previous
     * @return          Pyramid Chart itself
     */
    setLabelFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Pyramid Slice Labels.
     * @return  FillStyle object
     */
    getLabelFillStyle(): FillStyle;
    /**
     * Set font of Slice Labels.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Pyramid Chart itself
     */
    setLabelFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Slice Labels.
     * @return  FontSettings
     */
    getLabelFont(): FontSettings;
    /**
     * Set formatter of Slice Labels.
     *
     * See PyramidSliceLabelFormatters for a collection of default options.
     * @param   labelFormatter  SliceLabelFormatter - function which generates text of Labels per Slice.
     * @return                  Pyramid Chart itself
     */
    setLabelFormatter(labelFormatter: SliceLabelFormatter<PyramidSlice>): this;
    /**
     * Get formatter of Slice Labels.
     * @return  SliceLabelFormatter - function which generates text of Labels per Slice.
     */
    getLabelFormatter(): SliceLabelFormatter<PyramidSlice>;
    /**
     * Sets if animations are enabled or not.
     * @param   animationsEnabled   Boolean state for animations enabled
     * @return                      Pyramid Chart itself
     * @hidden
     */
    setAnimationsEnabled(animationsEnabled: boolean): this;
    /**
     * Gets if animations are enabled or not.
     * @return  Boolean state for animations enabled
     * @hidden
     */
    getAnimationsEnabled(): boolean;
}
/**
 * Enum for selecting different drawing approaches for *PyramidChart*.
 *
 * Use with *PyramidChart*.**setSliceMode()**
 */
export declare enum PyramidSliceModes {
    /**
     * Slices **height** represents its relative value inside the Pyramid Chart.
     */
    VariableHeight = 0,
    /**
     * Slices **width** represents its relative value inside the Pyramid Chart.
     */
    VariableWidth = 1
}
/**
 * File contains different implementations of Pyramid Charts, each with their own rendering logic.
 */
/**
 * *Pyramid Chart* implementation that draws Slice Labels on its left and right sides.
 * Slices and Labels are connected by 'label connector lines'.
 */
export declare class PyramidChartWithLabelsOnSides extends PyramidChart {
    /**
     * Set style of Label connector lines.
     * @param   labelConnectorStyle LineStyle object
     * @return                      Pyramid Chart itself
     */
    setLabelConnectorStyle(labelConnectorStyle: LineStyle): this;
    /**
     * Get style of Label connector lines.
     * @return  LineStyle object
     */
    getLabelConnectorStyle(): LineStyle;
    /**
     * Set gap between Slice / start of label connector, and end of label connector / Label.
     * @param   labelConnectorGap   Gap as pixels
     * @return                      Pyramid Chart itself
     */
    setLabelConnectorGap(labelConnectorGap: pixel): this;
    /**
     * Get gap between Slice / start of label connector, and end of label connector / Label.
     * @return  Gap as pixels
     */
    getLabelConnectorGap(): number;
    /**
     * Set the side where label should display
     * @param   labelSide   Left /Right
     * @return              Pyramid Chart itself
     */
    setLabelSide(labelSide: PyramidLabelSide): this;
    /**
     * Get the side where label shown
     * @return The label side
     */
    getLabelSide(): PyramidLabelSide;
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return  Point minimum size or undefined if unimplemented
     */
    getMinimumSize(): Point | undefined;
}
/**
 * *Pyramid Chart* implementation that draws Slice Labels inside the Slices.
 * Works well when Label texts are short and there are not a lot of Slices, as the actual Pyramid has more space.
 */
export declare class PyramidChartWithLabelsInsideSlices extends PyramidChart {
    /**
     * Get minimum size of Panel.
     * Depending on the type of class this value might be automatically computed to fit different elements.
     * @return      Point
     */
    getMinimumSize(): Point | undefined;
}
/**
 * Interface that can be used to define *Pyramid Chart* configurations that can't be changed after creation.
 *
 * Example usage:
 *
 * | Desired result                         | Value                                                                 |
 * | :------------------------------------- | :-------------------------------------------------------------------- |
 * | Pyramid Chart with default type          | *undefined*                                                        |
 * | Pyramid Chart with specified type        | { **type:** *PyramidChartTypes*.LabelsOnSides }                 |
 */
export interface PyramidChartOptions<PyramidChartType extends PyramidChartTypes> {
    /**
     * Interface for specifying desired "type" of Pyramid Chart.
     * This can be used to select different rendering approaches, mainly reflecting how Slice Labels are positioned.
     *
     * Options are located in **PyramidChartTypes**-collection. If undefined, will default to *PyramidChartWithLabelsOnSides*.
     */
    type?: PyramidChartType;
}
/**
 * Available Pyramid Chart types
 * @hidden
 */
export declare type PyramidChartTypes = typeof PyramidChartTypes[keyof typeof PyramidChartTypes];
/**
 * Collection of *PyramidChart* implementations. Each option can have their own visual type, and *API* for customization of it.
 *
 * This must be specified when the *PyramidChart* is created (or default one will be used).
 *
 * Example usage:
 *
 * | Desired result                                 | Usage                                                                             |
 * | :--------------------------------------------- | :-------------------------------------------------------------------------------- |
 * | Create a *PyramidChart* with default type    | *LightningChart*.Pyramid()                                                         |
 * | Create a *PyramidChart* with specified type  | *LightningChart*.Pyramid({ type: **PyramidChartTypes.LabelsInsideSlices** })  |
 */
export declare const PyramidChartTypes: {
    /**
     * Pyramid Chart type, where Slice Labels are positioned on the either left or right sides of Chart.
     * The side can be set using setLabelSide
     * Labels are connected to their Slices with lines, which can be styled using unique API for this Pyramid Chart type.
     */
    LabelsOnSides: typeof PyramidChartWithLabelsOnSides;
    /**
     * Pyramid Chart type, where Slice Labels inside the Slices.
     */
    LabelsInsideSlices: typeof PyramidChartWithLabelsInsideSlices;
};
/**
 * Options for selecting side of labels in a *PyramidChartWithLabelsOnSides*.
 *
 * Use with *PyramidChartWithLabelsOnSides*.**setLabelSide()**
 */
export declare enum PyramidLabelSide {
    /**
     * Label Side  - Right
     */
    Right = 0,
    /**
     * Label Side  - Left
     */
    Left = 1
}
/**
 * Possible Shape types for parts of a Slice.
 */
declare type PyramidSliceVisual = Polygon | Text;
/**
 * Class that represents a single Slice of a Pyramid Chart.
 * It is given to users when a Slice is added.
 */
export declare abstract class PyramidSlice extends Slice<PyramidSliceVisual> {
    /**
     * Set value of Slice.
     * @param   value   Numeric value
     * @return          Slice itself
     */
    abstract setValue(value: number): this;
    /**
     * Get value of Slice.
     * @return          Numeric value
     */
    abstract getValue(): number;
}
/**
 * Internal class that hides some internal interfaces of a Slice that are only needed for interactions with the owning Pyramid Chart.
 * @hidden
 */
export declare class InternalPyramidSlice extends PyramidSlice {
    protected _chart: PyramidChart;
    readonly scale: Vec2<Scale>;
    protected _removeFromChart: RemoveHandler<PyramidSlice>;
    protected _restoreFromChart: RestoreHandler<PyramidSlice>;
    /**
     * Index of Slice inside its owning Chart.
     * It tells how many Slices were created before this one.
     * It is not updated for disposed Slices, and so cannot be used for counting the amount of existing Slices.
     */
    readonly index: number;
    /**
     * @param   index               Index of Slice
     * @param    polygonLayer       Rendering layer for Polygon
     * @param    labelLayer         Rendering layer for Label
     * @param    _chart             Owning chart
     * @param    scale              Rendering scale
     * @param   _removeFromChart    Remove handler for Slice
     * @param    _restoreFromChart  Restore handler for Slice
     * @hidden
     */
    constructor(index: number, polygonLayer: LayerXY, labelLayer: LayerXY, _chart: PyramidChart, scale: Vec2<Scale>, _removeFromChart: RemoveHandler<PyramidSlice>, _restoreFromChart: RestoreHandler<PyramidSlice>);
    /**
     * Set value of Slice.
     * @param   value   Numeric value
     * @return          Slice itself
     */
    setValue(value: number): this;
    /**
     * Get value of Slice.
     * @return          Numeric value
     */
    getValue(): number;
    /**
     * Tell the owning chart to remove this component.
     * @return  Slice itself.
     */
    dispose(): this;
    /**
     * Tell the owning chart to restore this series.
     * @return  Slice itself.
     */
    restore(): this;
    /**
     * Method that owning Pyramid Chart uses to assign style of a Slice it owns.
     * @param   polygonFillStyle    FillStyle for Polygon
     * @param   polygonStrokeStyle  LineStyle for Polygon
     * @param   labelFillStyle  FillStyle for Label
     * @param   labelFont       FontSettings for Label
     */
    setStyle(polygonFillStyle: FillStyle, polygonStrokeStyle: LineStyle, labelFillStyle: FillStyle, labelFont: FontSettings): void;
    /**
     * Get animated value of Slice.
     * When value of Slice is changed, the animated value will not update immediately, but after an animation.
     * (if animations are not disabled).
     * @return  Animated value
     */
    getAnimatedValue(): number;
    /**
     * Attach series to an annotation.
     * @param entry Object which has to be attached
     * @return      Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Enable or disable forced highlighting of series
     * @param highLight True for enabled and false for disabled
     * @returns         Series itself for fluent interface
     */
    setHighlighted(highLight: boolean): this;
    /**
     * Method styles an attached entry according to Slice itself.
     */
    protected styleAttachedEntry(entry: LegendBoxEntry): void;
}
export {};
/**
 * Type of a scroll-easing function.
 * Defines how Axis scroll animation looks.
 * @hidden
 */
export declare type ScrollEasing = (cur: number, target: number, px: number) => number;
/**
 * *Axis* is a child component of *ChartXY*. It defines a numeric range on a single plane (*X* or *Y*),
 * that will be used to scale attached *Series* to the *ChartXY*s viewport.
 *
 * A *ChartXY* can have any number of *Axes*. They can be positioned on all four sides of the *ChartXY*:
 * - left       (default Y)
 * - bottom     (default X)
 * - right
 * - top
 *
 * *Axes* have automatic scrolling logic to fit attached *Series*.
 * This can be modified with *Axis*.**setScrollStrategy()**
 *
 * *Axes* are associated with a title, which can be enabled with *Axis*.**setTitle()**
 */
export declare class Axis implements Validatable {
    protected readonly _bg: LayerXY<Engine>;
    protected readonly _fg: LayerXY<Engine>;
    protected readonly _ui: LayerXY<Engine>;
    readonly scale: Scale;
    readonly heightScale: Scale;
    protected readonly _strategy: DimensionalAxisStrategy;
    protected readonly _chart: ChartXY;
    protected readonly _uiPosition: number;
    readonly tickStrategy: AxisTickStrategy;
    protected _removeAxis: (axis: Axis) => void;
    protected _restoreAxis: (axis: Axis) => void;
    /**
     * Describe height direction of axis, affects label position, tick line and grid line directions.
     */
    readonly directionFactor: 1 | -1;
    /**
     * Pair of scales, which describes space of axis sub-elements
     */
    readonly plottingScale: Vec2<Scale>;
    /**
     * @param _bg                       Background layer of rendering Engine
     * @param _fg                       Foreground layer of rendering Engine
     * @param _ui                       UI layer of rendering Engine
     * @param scale                     Scale of the Axis value
     * @param heightScale               Height Scale or the Axis
     * @param _strategy                 Axis strategy, defines X or Y positing
     * @param _chart                    Chart object which would contain this axis. Is used to query chart margins
     * @param _uiPosition               UI position in percents. 0 means bottom/right, 100 means top/left,
     *                                  anything in between places the axis in the custom position along the chart's space
     * @param tickStrategy              Custom tick strategy for axis. Defines positioning and formating of ticks.
     * @param _removeAxis               Injected remove method from owner.
     * @param _restoreAxis              Injected restore method from owner.
     * @param setSeriesAttachHandler    Function that axis calls to inject series attach handler to its owning chart.
     * @hidden
     */
    constructor(_bg: LayerXY<Engine>, _fg: LayerXY<Engine>, _ui: LayerXY<Engine>, scale: Scale, heightScale: Scale, _strategy: DimensionalAxisStrategy, _chart: ChartXY, _uiPosition: number, tickStrategy: AxisTickStrategy, _removeAxis: (axis: Axis) => void, _restoreAxis: (axis: Axis) => void, setSeriesAttachHandler: (axis: Axis, handler: AxisAttachHandler) => void);
    /**
     * Get height of axis in pixels
     * @return      Number
     */
    getHeight(): number;
    /**
     * Stop scrolling of axis until restored.
     */
    stop(): this;
    /**
     * Undo effects of 'stop'.
     */
    release: () => void;
    /**
     * Get is axes' scrolling currently prevented by usage of mouse-interactions or 'stop()' method.
     * @return  Boolean flag
     */
    isStopped(): boolean;
    /**
     * Fit axis view to attached series.
     * @param   animate Boolean for animation enabled, or number for animation duration in millis
     * @param   freeze  Freeze axis to fitted view? False by default.
     */
    fit(animate?: number | boolean, freeze?: boolean): this;
    /**
     * Pan scale by pixel value delta.
     * @param   amount  Amount to shift scale of axis in pixels
     */
    pan(amount: pixel): void;
    /**
     * Zoom scale from/to a position.
     * @param   referencePosition   Position to zoom towards or from on axis
     * @param   zoomDirection       Amount and direction of zoom [-1, 1] as a guideline
     */
    zoom(referencePosition: number, zoomAmount: number): void;
    /**
     * Add custom tick
     * @param markerBuilder     Custom builder for marker of custom tick
     * @returns                 CustomTick created object
     */
    addCustomTick<TickMarkerBackgroundType extends PointableBackground>(markerBuilder?: UIPointableTextBoxBuilder<TickMarkerBackgroundType & InternalBackground>): CustomTick<TickMarkerBackgroundType>;
    /**
     * Format a value along axis to string. Behaviour depends on the Axis' TickStrategy.
     * Eq. A DateTime-Axis will interpret 'value' as a Date.
     * @param   value   Value along axis
     * @return          Value formated to string
     */
    formatValue: (value: number) => string;
    /**
     * Get position of axis on its chart as a %
     */
    getUiPosition(): number;
    /**
     * Set enabled flags for all mouse-interactions on axis directly.
     * Does not affect chart mouse-interactions.
     * @param   enabled     Boolean: are mouse-interactions enabled
     * @return              Axis itself for fluent interface
     */
    setMouseInteractions(enabled: boolean): this;
    /**
     * @returns Axis stroke as a LineStyle object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Specifies axis stroke
     * @param  value        Axis stroke style
     * @returns             Axis itself for fluent interface
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of axis overlay (shown only when interacting with mouse / touch).
     * @return  FillStyle object
     */
    getOverlayStyle(): FillStyle;
    /**
     * Set style of axis overlay (shown only when interacting with mouse / touch).
     * @param   style   FillStyle object or mutator to modify existing one
     */
    setOverlayStyle(style: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set is mouse-interaction enabled:
     * Zooming by dragging on axis. (LMB)
     * @param   enabled     Boolean flag
     */
    setAxisInteractionZoomByDragging(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Zooming by dragging on axis. (LMB)
     * @return  Boolean flag
     */
    getAxisInteractionZoomByDragging(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Panning by dragging on axis. (RMB)
     * @param   enabled     Boolean flag
     */
    setAxisInteractionPanByDragging(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Panning by dragging on axis. (RMB)
     * @return  Boolean flag
     */
    getAxisInteractionPanByDragging(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Zooming by mouse-wheeling on axis.
     * @param   enabled     Boolean flag
     */
    setAxisInteractionZoomByWheeling(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Zooming by mouse-wheeling on axis.
     * @return  Boolean flag
     */
    getAxisInteractionZoomByWheeling(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Release axis by double-clicking on axis.
     * @param   enabled     Boolean flag
     */
    setAxisInteractionReleaseByDoubleClicking(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Release axis by double-clicking on axis.
     * @return  Boolean flag
     */
    getAxisInteractionReleaseByDoubleClicking(): boolean;
    /**
     * Set mouse style when hovering over axis area.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setAxisMouseHoverStyle(mouseStyle?: string): this;
    /**
     * Get mouse style when hovering over axis area.
     * @return  Mouse-style preset name
     */
    getAxisMouseHoverStyle(): string;
    /**
     * Set mouse style when panning axis.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setAxisMousePanStyle(mouseStyle?: string): this;
    /**
     * Get mouse style when panning axis.
     * @return  Mouse-style preset name
     */
    getAxisMousePanStyle(): string;
    /**
     * Set mouse style when zooming axis.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setAxisMouseZoomStyle(mouseStyle?: string): this;
    /**
     * Get mouse style when zooming axis.
     * @return  Mouse-style preset name
     */
    getAxisMouseZoomStyle(): string;
    /**
     * Set style of Axis Ticks.
     *
     * Example usage:
     *
     * | Desired result             | Argument                                                                                          |
     * | :------------------------- | :------------------------------------------------------------------------------------------------ |
     * | Specified TickStyle        | new VisibleTicks({ labelFillStyle: new SolidFill({ color: ColorHEX('#F00'), tickLength: 8 }) })   |
     * | Changed label fill style   | (visibleTicks) => visibleTicks.setLabelFillStyle(new SolidFill({ color: ColorHEX('#F00') }))      |
     * | Hidden                     | emptyTick                                                                                         |
     *
     * @param   value   Either a TickStyle object or a function, which will be used to create a new TickStyle based on current value.
     * @returns         Chart itself
     */
    setTickStyle(value: TickStyle | ImmutableMutator<TickStyle>): this;
    /**
     * Get style of Axis Ticks.
     * @return  TickStyle object
     */
    getTickStyle(): TickStyle;
    /**
     * @returns Axis title string
     */
    getTitle(): string;
    /**
     * Specifies an Axis title string
     * @param   title  Axis title as a string
     * @returns        Axis itself for fluent interface
     */
    setTitle(title: string): this;
    /**
     * @returns Axis title fillstyle
     */
    getTitleFillStyle(): FillStyle;
    /**
     * Specifies Axis title FillStyle
     * @param   fillStyle   FillStyle of Axis title or mutator to modify existing one
     * @returns             Axis itself for fluent interface
     */
    setTitleFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get font of axis labels.
     * @return          FontSettings
     */
    getTitleFont(): FontSettings;
    /**
     * Set font of Axis title.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Object itself
     */
    setTitleFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * @returns Padding after Axis title
     */
    getTitleMargin(): number;
    /**
     * Specifies padding after Axis title.
     * This is only accounted when title is visible.
     * @param  margin   Gap between the title and the next axis in pixels. Can also affect chart margins
     * @returns         Axis itself for fluent interface
     */
    setTitleMargin(margin: pixel): this;
    /**
     * @returns Axis nib stroke length in pixels
     */
    getNibLength(): number;
    /**
     * Specifies Axis nib stroke length in pixels
     * @param  length  Axis nib stroke length in pixels
     * @returns        Axis itself for fluent interface
     */
    setNibLength(length: pixel): this;
    /**
     * @returns nib stroke fillstyle as a Fillstyle object
     */
    getNibStyle(): LineStyle;
    /**
     * Specifies Axis nibs StrokeStyle
     * @param   value       LineStyle object or mutator to modify existing one
     * @returns             Axis itself for fluent interface
     */
    setNibStyle(value: SolidLine): this;
    /**
     * Get style of nib overlay (shown only when interacting with mouse / touch).
     * @return  FillStyle object
     */
    getNibOverlayStyle(): FillStyle;
    /**
     * Set style of nib overlay (shown only when interacting with mouse / touch).
     * @param   style   FillStyle object or mutator to modify existing one
     */
    setNibOverlayStyle(style: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set ideal size of nib mouse-picking area in pixels.
     * @param   size   Size in pixels
     * @returns Object itself
     */
    setNibMousePickingAreaSize(size: pixel): this;
    /**
     * Get size of nib mouse-picking area in pixels.
     * @returns Size in pixels
     */
    getNibMousePickingAreaSize(): number;
    /**
     * Set is mouse-interaction enabled:
     * Scaling by dragging on nib.
     * @param   enabled     Boolean flag
     */
    setNibInteractionScaleByDragging(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Scaling by dragging on nib.
     * @return  Boolean flag
     */
    getNibInteractionScaleByDragging(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Scaling by mouse-wheeling on nib.
     * @param   enabled     Boolean flag
     */
    setNibInteractionScaleByWheeling(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Scaling by mouse-wheeling on nib.
     * @return  Boolean flag
     */
    getNibInteractionScaleByWheeling(): boolean;
    /**
     * Set mouse style when hovering over nib area.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setNibMouseHoverStyle(mouseStyle?: string): this;
    /**
     * Get mouse style when hovering over nib area.
     * @return  Mouse-style preset name
     */
    getNibMouseHoverStyle(): string;
    /**
     * Set mouse style when scaling nib.
     * @param   mouseStyle  Mouse-style preset name (see ui/constants.MouseStyles)
     * @return              Object itself
     */
    setNibMouseScaleStyle(mouseStyle?: string): this;
    /**
     * Get mouse style when hovering over nib area.
     * @return  Mouse-style preset name
     */
    getNibMouseScaleStyle(): string;
    /**
     * Set all states of chart mouse interactions on axis at once.
     * @param   enabled Boolean flag
     */
    setChartInteractions(enabled: boolean): this;
    /**
     * Set is mouse-interaction enabled:
     * Panning by dragging on chart.
     * @param   enabled     Boolean flag
     */
    setChartInteractionPanByDrag(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Panning by dragging on chart.
     * @return  Boolean flag
     */
    getChartInteractionPanByDrag(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Zooming by mouse-wheeling on chart.
     * @param   enabled     Boolean flag
     */
    setChartInteractionZoomByWheel(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Zooming by mouse-wheeling on chart.
     * @return  Boolean flag
     */
    getChartInteractionZoomByWheel(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Zooming by capturing rectangle on chart.
     * @param   enabled     Boolean flag
     */
    setChartInteractionZoomByDrag(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Zooming by capturing rectangle on chart.
     * @return  Boolean flag
     */
    getChartInteractionZoomByDrag(): boolean;
    /**
     * Set is mouse-interaction enabled:
     * Fitting by capturing rectangle on chart.
     * @param   enabled     Boolean flag
     */
    setChartInteractionFitByDrag(enabled: boolean): this;
    /**
     * Get is mouse-interaction enabled:
     * Fitting by capturing rectangle on chart.
     * @return  Boolean flag
     */
    getChartInteractionFitByDrag(): boolean;
    /**
     * Specifies zoom animation to use.
     *
     * Example usage:
     *
     * | Desired result              | Argument                                         | Parameters                                                                                                                            |
     * | :-------------------------  | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
     * | Change animation            | setAnimationZoom(AnimationEasings.easeOut, 500)  | First parameter defines the easing to use for the animation. Second parameter is optional, and defines the duration for the animation |
     * | Disable zooming animations  | axis.setAnimationZoom(undefined)                 | Passing **undefined** as the parameter will disable the zooming animations for the Axis.                                              |
     *
     * @param   easing      Easing of animation. Undefined disables zoom animations. See 'engine/animator.Easings' for defaults
     * @param   duration    Optional default duration for zooming animations in milliseconds
     */
    setAnimationZoom(easing: AnimationEasing | undefined, duration?: number): this;
    /**
     * Specifies scroll animation.
     * @param   enabled     Boolean flag for whether scrolling should be animated or not.
     */
    setAnimationScroll(enabled: boolean | undefined): this;
    /**
     * Specify AxisScrollStrategy of the Axis. This decides where axis scrolls based on current view and series boundaries.
     * @param scrollStrategy    AxisScrollStrategy or undefined to disable automatic scrolling.
     *                          See AxisScrollStrategies for a collection of options.
     * @return                  Axis for fluent interface
     */
    setScrollStrategy(scrollStrategy: AxisScrollStrategy | undefined): this;
    /**
     * @return Current AxisScrollStrategy
     */
    getScrollStrategy(): AxisScrollStrategy | undefined;
    /**
     * Set axis scale interval.
     * @param  start                Start scale value
     * @param  end                  End scale value
     * @param  animate              Boolean for animation enabled, or number for animation duration in millis
     * @param  disableScrolling     If true, disables automatic scrolling after setting interval
     * @returns this for fluent interface
     */
    setInterval(start: number, end: number, animate?: number | boolean, disableScrolling?: boolean): this;
    /**
     * Dispose all Axis sub-elements and remove this Axis from collection it's in.
     * @returns this for fluent interface
     */
    dispose(): this;
    /**
     * @return True if all Axis sub-elements are disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Restore all Axis sub-elements and restore this Axis to the collection it was in.
     * @returns this for fluent interface
     * TODO: Needs to properly restore the nibs - or recreate them. Current dispose would force us to use the latter method.
     * Needs to put the axis back to a proper position.
     */
    restore(): this;
    /**
     * Subscribe to on scale change event
     * @param listener Event listener
     * @param min      Scale start value
     * @param max      Scale end value
     * @returns Token that is used to unsubscribe from the event
     */
    onScaleChange(listener: (start: number, end: number) => void): Token;
    /**
     * Remove subscription from scale change event
     * @param token Event listener
     * @returns True if the listener is successfully removed and false if it is not found
     */
    offScaleChange(token: Token): boolean;
}
/**
 * Interface for a strategy which defines Axis dimension
 */
interface AxisStrategy {
    /**
     * Mouse style when dragging over axis
     */
    readonly defaultDragMouseStyle: string;
    /**
     * Correct CustomTickStrategy which match dimension of the Axis
     */
    readonly customTickStrategy: CustomTickStrategy & MultidimensionalStrategy;
    /**
     * Used internally for rendering the axis title text at a specified angle
     * @param   direction Axis direction factor
     * @returns           Configured title text rotation in degrees
     */
    readonly getTitleTextRotation: (direction: 1 | -1) => number;
    /**
     * Abstract function that returns the minimum coordinate of an attached series bounds.
     * Basically returns an X or Y coordinate depending on the type of Axis
     * @param   series      An attached series
     * @return              Minimum coordinate of series bounds
     */
    readonly getSeriesMin: (series: SeriesXY) => number | undefined;
    /**
     * Abstract function that returns the maximum coordinate of an attached series bounds.
     * Basically returns an X or Y coordinate depending on the type of Axis
     * @param   series  An attached series
     * @return          Maximum coordinate of series bounds
     */
    readonly getSeriesMax: (series: SeriesXY) => number | undefined;
}
/**
 * Union of Dimensional and Axis Strategies
 * @hidden
 */
export declare type DimensionalAxisStrategy = MultidimensionalStrategy & AxisStrategy;
export {};
/**
 * Public interface for TickMarkers of CustomTicks.
 */
export declare type TickMarker<BackgroundType extends PointableBackground = PointableBackground> = StylableText & StylableBackground<BackgroundType> & Pointable;
/**
 * Internal interface for TickMarkers of CustomTicks.
 * Basically restricts mouse-interaction methods. ( if required, these should be implemented by the class that owns the TickMarker )
 * @hidden
 */
export declare type InternalTickmarker<BackgroundType extends PointableBackground = PointableBackground> = PointableTextBox<BackgroundType>;
/**
 * Interface for function which specifies CustomTick text.
 */
export declare type CustomTickTextFormatter<TickMarkerBackgroundType extends PointableBackground = PointableBackground> = (value: number, customTick: CustomTick<TickMarkerBackgroundType>) => string;
/**
 * Custom tick
 * Is designed to be used strictly by Axis objects
 */
export declare abstract class CustomTick<TickMarkerBackgroundType extends PointableBackground = PointableBackground> extends UIObject {
    protected readonly _bg: LayerXY;
    protected readonly _ui: LayerXY;
    readonly scale: Vec2<Scale>;
    protected readonly _strategy: DimensionalCustomTickStrategy;
    protected _direction: UIDirections;
    private _markerBuilder;
    protected readonly _remove: RemoveHandler<CustomTick>;
    protected readonly _restore: RestoreHandler<CustomTick>;
    /**
     * Axis that CustomTick belongs to.
     */
    readonly axis: Axis;
    /**
     * Scale of owning axis.
     */
    readonly mainScale: Scale;
    /**
     * @param axis              Axis that CustomTick belongs to
     * @param _strategy         CustomTick strategy, defines X or Y positing
     * @param _direction        Direction of the tick pointer as enum value
     * @param _markerBuilder    Custom builder for marker of custom tick
     */
    constructor(axis: Axis, _bg: LayerXY, _ui: LayerXY, scale: Vec2<Scale>, _strategy: DimensionalCustomTickStrategy, _direction: UIDirections, _markerBuilder: UIPointableTextBoxBuilder<TickMarkerBackgroundType & InternalBackground>, _remove: RemoveHandler<CustomTick>, _restore: RestoreHandler<CustomTick>);
    /**
     * Restore all sub-elements of custom tick
     * @return This for fluent interface
     */
    restore(): this;
    /**
     * Disposes all custom tick sub-elements
     * @returns This for fluid interface
     */
    dispose(): this;
    /**
     * @return True if all customTick child elements are disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Check that customTick fit the main scale
     * @returns         Boolean with the result
     */
    isInScale(): boolean;
    /**
     * Sets the position of this custom tick on its Axis
     * @param value Value in the units of main scale
     * @returns     This for fluid interface
     * @sideEffect  Overrides text of CustomTicks Marker with formated value.
     */
    setValue(value: number): this;
    /**
     * Value of CustomTick
     */
    getValue(): number;
    /**
     * Set text of CustomTicks' Marker with a formatting function.
     *
     * Example usage:
     *
     * | Desired result | Argument                                                                                                      |
     * | :------------- | :------------------------------------------------------------------------------------------------------------ |
     * | Marker shows formatted position of CustomTick on its Axis  | (position, customTick) => customTick.axis.formatValue(position)   |
     * | Marker shows 'Hello world'                                 | (position, customTick) => 'Hello world'                           |
     * @param   textFormatter   A function of type: *CustomTickTextFormatter*, that defines text of CustomTicks' Marker.
     * @return                  Object itself
     */
    setTextFormatter(textFormatter: CustomTickTextFormatter): this;
    /**
     * Remove Marker from rendering collection, so it can be safely trashed by GC
     * @returns Object itself for fluent interface
     */
    disposeMarker(): this;
    /**
     * Place Marker back to rendering collection, so it became visible again
     * @returns Object itself for fluent interface
     */
    restoreMarker(): this;
    /**
     * @returns True if visible and False for invisible
     */
    isDisposedMarker(): boolean;
    /**
     * Set length of grid stroke in percents
     * @param length     Grid line length as a % of viewport size
     * @returns          This for fluent interface
     */
    setGridStrokeLength(length: number): this;
    /**
     * @returns Grid stroke length as a % of the viewport size
     */
    getGridStrokeLength(): number;
    /**
     * @param value Grid stroke style
     * @returns This for fluent interface
     */
    setGridStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * @returns Grid stroke style as a LineStyle object
     */
    getGridStrokeStyle(): LineStyle;
    /**
     * Set padding on sides of label
     * @param padding Distance in pixels
     * @returns       Object itself for fluent interface
     */
    setSidePaddings(padding: pixel): this;
    /**
     * @returns Size of padding at sides of label
     */
    getSidePaddings(): number;
    /**
     * Mutator function for the TickMarker
     * @param   mutator     TickMarker mutator function
     * @returns             Object itself for fluent interface
     */
    setMarker(mutator: Mutator<TickMarker<TickMarkerBackgroundType>>): this;
    /**
     * Get marker of tick.
     * @returns PointableTextBox object
     */
    getMarker(): TickMarker<TickMarkerBackgroundType>;
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return      Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
}
/**
 * Custom tick marker extended by some internal APIs
 * @hidden Internal class
 */
export declare class InternalCustomTick<TickMarkerBackgroundType extends PointableBackground = PointableBackground> extends CustomTick<TickMarkerBackgroundType> {
    protected readonly _bg: LayerXY;
    protected readonly _ui: LayerXY;
    readonly scale: Vec2<Scale>;
    protected readonly _add: RemoveHandler<InternalCustomTick>;
    protected readonly _remove: RestoreHandler<InternalCustomTick>;
    /**
     * @param axis              Axis that CustomTick belongs to
     * @param scale             X and Y Axis used for drawing of the attached axis
     * @param mainScale         Scale of the custom tick`s value
     * @param direction         Direction of the tick pointer as enum value
     * @param markerBuilder     Custom builder for marker of custom tick
     * @hidden
     */
    constructor(axis: Axis, _bg: LayerXY, _ui: LayerXY, scale: Vec2<Scale>, strategy: DimensionalCustomTickStrategy, direction: UIDirections, _add: RemoveHandler<InternalCustomTick>, _remove: RestoreHandler<InternalCustomTick>, markerBuilder?: UIPointableTextBoxBuilder<TickMarkerBackgroundType & InternalBackground>);
    /**
     * @return True if all customTick child elements are disposed, false if not.
     */
    isDisposed(): boolean;
    /**
    * Disposes all custom tick sub-elements
    * @returns This for fluid interface
    */
    dispose(): this;
    /**
     * Set distance between tick and label
     * @param padding Distance in pixels
     * @returns       Object itself for fluent interface
     */
    setTopPadding(padding: pixel): this;
    /**
     * Set padding after label
     * @param padding Distance in pixels
     * @returns       Object itself for fluent interface
     */
    setPaddingBottom(padding: pixel): this;
    /**
     * Update sub-elements of custom tick
     * @returns Object itself for fluent interface
     */
    update(): this;
    /**
     * Similarly to Axis.plot(), plots all the relevant shapes of this customTick
     * and shoves them into the passed engine.
     * @param  axisScale     Scale object of the axis this customTick is contained in.
     * @param  startHeight   Start height in pixels of the axis this customTick is contained in
     * @param  axisThickness Thickness in pixels of the axis this customTick is contained in
     * @param  margins       Vec2 of owning axis' margins in percents (0 to 1)
     */
    plot(gridStrokeStart: number, gridStrokeLen: number, gridStrokeOffset: number, tickStart: number): this;
    /**
     * @param  length   Length of the customTick line in pixels
     * @returns         This for fluent interface
     */
    setTickLength(length: pixel): this;
    /**
     * @param shouldAxisAllocateSpace   Should axis allocate space for a custom tick
     * @returns                         This for fluent interface
     */
    setShouldAxisAllocateSpace(shouldAxisAllocateSpace: boolean): this;
    /**
     * @returns Length of this CustomTick line in pixels
     */
    getTickLength(): number;
    /**
     * @returns Height of tick marker
     */
    getTickSize(): number;
    /**
     * @returns Flag of should axis allocate space for a custom tick
     */
    getShouldAxisAllocateSpace(): boolean;
}
/**
 * Interface for a strategy which defines CustomTick dimension
 * @hidden
 */
export interface CustomTickStrategy {
    /**
     * Set distance between tick and label
     * @param padding Distance in pixels
     * @returns       Object itself for fluent interface
     */
    readonly setTopPadding: (marker: TickMarker, direction: UIDirections, padding: number) => void;
    /**
     * Set padding after label
     * @param padding Distance in pixels
     * @returns       Object itself for fluent interface
     */
    readonly setPaddingBottom: (marker: TickMarker, direction: UIDirections, padding: number) => void;
    /**
     * Set padding on sides of label
     * @param padding Distance in pixels
     * @returns       Object itself for fluent interface
     */
    readonly setSidePaddings: (marker: TickMarker, padding: number) => void;
    /**
     * @returns Size of padding at sides of label
     */
    readonly getSidePaddings: (marker: TickMarker) => number;
}
/**
 * Union of Dimensional and CustomTick Strategies
 * @hidden
 */
export declare type DimensionalCustomTickStrategy = CustomTickStrategy & MultidimensionalStrategy;
/**
 * Interface for a strategy which defines dimension
 */
export interface MultidimensionalStrategy {
    /**
     * @param size Two dimensional value width of which has to be extracted
     * @returns    Width of Vec2
     */
    readonly getWidth: <T>(sizes: Vec2<T>) => T;
    /**
     * @param size Two dimensional value height of which has to be extracted
     * @returns    Height of Vec2
     */
    readonly getHeight: <T>(size: Vec2<T>) => T;
    /**
     * Combine argument with the tick value to create relevant Vec2
     * @param   height Value on height Scale units
     * @return         Vec2 which represents relevant for custom tick position
     */
    readonly toVec2: <T>(value: T, height: T) => Vec2<T>;
    /**
     * Combine argument with the tick value to create relevant Point
     * @param   height Value on height Scale units
     * @return         Point
     */
    readonly toPoint: (value: number, height: number) => Point;
}
/**
 * MultidimensionalStrategy for X Dimension
 */
export declare const xDimensionStrategy: MultidimensionalStrategy;
/**
 * MultidimensionalStrategy for X Dimension
 */
export declare const yDimensionStrategy: MultidimensionalStrategy;
/**
 * Type of a scroll strategy.
 * Consists of two scrolling functions:
 * 'start' and 'end'
 * @hidden
 */
export interface AxisScrollStrategy {
    /**
     * Scroll function for 'start' value.
     * Scrolls from interval 'scaleStart' - 'scaleEnd' according to 'contentMin' - 'contentMax' taking 'interpolation' into account
     * @param   scaleStart      'start' value of starting scale (not necessarily min!)
     * @param   scaleEnd        'end' value of starting scale (not necessarily max!)
     * @param   contentMin      Minimum value of content to scroll according to
     * @param   contentMax      Maximum value of content to scroll according to
     * @return                  'start' of resulting scale
     */
    start: (scaleStart: number, scaleEnd: number, contentMin: number, contentMax: number) => number;
    /**
     * Scroll function for 'end' value.
     * Scrolls from interval 'scaleStart' - 'scaleEnd' according to 'contentMin' - 'contentMax' taking 'interpolation' into account
     * @param   scaleStart      'start' value of starting scale (not necessarily min!)
     * @param   scaleEnd        'end' value of starting scale (not necessarily max!)
     * @param   contentMin      Minimum value of content to scroll according to
     * @param   contentMax      Maximum value of content to scroll according to
     * @return                  'end' of resulting scale
     */
    end: (scaleStart: number, scaleEnd: number, contentMin: number, contentMax: number) => number;
}
/**
 * Collection of available *AxisScrollStrategies*.
 *
 * *AxisScrollStrategies* can be used to customize the behaviour of *Axis scrolling*.
 *
 * Use with *Axis*.**setScrollStrategy()**
 */
export declare const AxisScrollStrategies: {
    /**
     * *Axis* will constantly scroll to fit attached *Series*.
     */
    fitting: AxisScrollStrategy;
    /**
     * *Axis* will scroll to fit *Series* that are out of view, but it won't shrink even if there is empty space (like "fitting" does).
     */
    expansion: AxisScrollStrategy;
    /**
     * *Axis* will scroll to show new, **progressive** data, but will keep its interval constant - leaving older data out of view.
     */
    progressive: AxisScrollStrategy;
    /**
     * *Axis* will scroll to show new, **regressive** data, but will keep its interval constant - leaving older data out of view.
     */
    regressive: AxisScrollStrategy;
};
/**
 * File contains interface and implementations of AxisTickStrategy -
 * strategy which defines creation, positioning and formating of axes ticks.
 */
/**
 * Interface of AxisTickStrategy.
 * Defines creation, positioning and formating of axes ticks.
 *
 * See 'AxisTickStrategies' for implementations.
 * @hidden
 */
export interface AxisTickStrategy {
    /**
     * Function that formats values of axis ticks.
     */
    formatValue: FormattingFunction;
    /**
     * @param   start   Starting value of an interval
     * @param   end     Ending value of an interval
     * @return          Minimal floating point precision if an interval is valid
     */
    computeMinimalPrecision: (start: number, end: number) => undefined | number;
}
/**
 * Collection of *AxisTickStrategies*.
 *
 * *AxisTickStrategies* modify logic of drawing *Axis Ticks* and formatting to better suit different user applications.
 * For example, a *DateTime Axis* is created by selecting *AxisTickStrategies.DateTime*.
 *
 * *AxisTickStrategy* must be specified when an *Axis* is created (or default one is used).
 */
export declare const AxisTickStrategies: {
    /**
     * *AxisTickStrategy* for numeric axes. Formats values simply as numbers and tries to place ticks at round intervals.
     *
     * Example usage:
     *
     * | Desired result                         | Usage                                                                                 |
     * | :------------------------------------- | :------------------------------------------------------------------------------------ |
     * | Create *Numeric X Axis*                | *ChartXY*.addAxisX(undefined, **AxisTickStrategies.Numeric**)                         |
     * | Specify *default X Axis* as *Numeric*  | *LightningChart*.ChartXY({  defaultAxisXTickStrategy: **AxisTickStrategies.Numeric** })|
     */
    Numeric: AxisTickStrategy;
    /**
     * *AxisTickStrategy* for numeric axes. Formats values as numbers and tries
     * to utilize different units (K, M, Etc) for more compact display.
     *
     * Can also be useful for not displaying fractions (for intervals bigger than 10).
     *
     * Example usage:
     *
     * | Desired result                                 | Usage                                                                                             |
     * | :--------------------------------------------- | :------------------------------------------------------------------------------------------------ |
     * | Create *NumericWithUnits X Axis*               | *ChartXY*.addAxisX(undefined, **AxisTickStrategies.NumericWithUnits**)                            |
     * | Specify *default X Axis* as *NumericWithUnits* | *LightningChart*.ChartXY({  defaultAxisXTickStrategy: **AxisTickStrategies.NumericWithUnits** })   |
     */
    NumericWithUnits: AxisTickStrategy;
    /**
     * *Factory* for *DateTime AxisTickStrategy*. Formats values as *Date*s according to JavaScript API:
     *
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
     *
     * Example usage:
     *
     * | Desired result                                                         | Usage                                                                                                 |
     * | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
     * | Create *DateTime X Axis* that formats 0 as '1.1.1970'                  | *ChartXY*.addAxisX(undefined, **AxisTickStrategies.DateTime()**)                                      |
     * | Specify *default X Axis* as *DateTime* that formats 0 as '1.1.2019'    | *LightningChart*.ChartXY({  defaultAxisXTickStrategy: **AxisTickStrategies.DateTime(2019, 0, 1)** })   |
     * | *DateTime* formatting like: 'Thursday, 9 AM'                           | *AxisTickStrategies*.DateTime(undefined, undefined, { weekday: 'long', hour: 'numeric' })             |
     *
     * @param   origin  Origin date. Value 0 will be interpreted as this date. Defaults to javascript Date origin - January 1, 1970 UTC.
     *                  **Proper usage can drastically improve achievable zoom resolution**
     * @param   locale  Valid javascript Date locale string, that specifies a geographical, political or cultural region.
     * @param   options Valid javascript Intl.DateTimeFormat options object, that specifies a weekday, year, month and day formats.
     */
    DateTime: (origin?: Date, locale?: string | undefined, options?: Intl.DateTimeFormatOptions | undefined) => AxisTickStrategy;
};
/**
 * Properties of a (visible) TickStyle.
 */
export interface TickStyleProperties {
    /**
     * Length of GridStroke, where 1 = full and 0 = zero.
     */
    gridStrokeLength: number;
    /**
     * Style of GridStroke as a SolidLine object.
     */
    gridStrokeStyle: SolidLine;
    /**
     * Length of Tick itself as pixels.
     */
    tickLength: pixel;
    /**
     * Style of Tick itself as a SolidLine object.
     */
    tickStyle: SolidLine;
    /**
     * Padding after Tick as pixels.
     */
    tickPadding: pixel;
    /**
     * Font of Label as FontSettings.
     */
    labelFont: FontSettings;
    /**
     * FillStyle of Label as a VisibleFill object.
     */
    labelFillStyle: VisibleFill;
    /**
     * Padding after label as pixels.
     */
    labelPadding: pixel;
}
/**
 * Abstract base class of an immutable Settings object for Axis Ticks.
 *
 * For implementations, see VisibleTicks and emptyTick.
 * @hidden Internal class
 */
export declare abstract class TickStyle {
}
/**
 * Class which is used to style *Axis* *Ticks*. Use with *Axis*.**setTickStyle()**
 *
 * Instances of VisibleTicks are *immutable*, meaning that its setters don't modify the object,
 * but instead return a completely new modified object.
 *
 * When creating a new VisibleTicks object from scratch, parameters can be passed like follows:
 * - new VisibleTicks({ labelFillStyle: new SolidFill({ color: ColorHEX('#F00'), tickLength: 8 })
 */
export declare class VisibleTicks extends TickStyle {
    /**
     * When creating a new VisibleTicks object from scratch, parameters can be passed like follows:
     * - new VisibleTicks({ labelFillStyle: new SolidFill({ color: ColorHEX('#F00'), tickLength: 8 })
     * @param   props   Optional object containing parameters for creation of VisibleTicks
     */
    constructor(props?: Partial<TickStyleProperties>);
    /**
     * Construct a new VisibleTicks object based on this one, but with modified gridstroke length.
     * @param   length  Length of GridStroke, where 1 = full and 0 = zero.
     * @return          New VisibleTicks object
     */
    setGridStrokeLength(length: number): this;
    /**
     * Get length of GridStroke.
     * @return  Length of GridStroke, where 1 = full and 0 = zero.
     */
    getGridStrokeLength(): number;
    /**
     * Construct a new VisibleTicks object based on this one, but with modified GridStroke style.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified SolidLine    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide **only** GridStrokes use *transparentLine*                    |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @return          New VisibleTicks object
     */
    setGridStrokeStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Get style of GridStrokes.
     * @return  SolidLine object
     */
    getGridStrokeStyle(): SolidLine;
    /**
     * Set length of Ticks.
     * @param   length  Length of Ticks as pixels.
     * @return          New VisibleTicks object
     */
    setTickLength(length: pixel): this;
    /**
     * Get length of Ticks.
     * @return  Length of Ticks as pixels
     */
    getTickLength(): pixel;
    /**
     * Construct a new VisibleTicks object based on this one, but with modified Tick style.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified SolidLine    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide **only** Ticks use *transparentLine*               |
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @return          New VisibleTicks object
     */
    setTickStyle(style: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Get style of Ticks.
     * @return  SolidLine object
     */
    getTickStyle(): SolidLine;
    /**
     * Set padding after Tick as pixels.
     * @param   padding Padding after Tick as pixels.
     * @return          New VisibleTicks object with modified Tick padding
     */
    setTickPadding(padding: pixel): this;
    /**
     * Get padding after Tick as pixels.
     * @return  Padding after Tick as pixels.
     */
    getTickPadding(): pixel;
    /**
     * Set fill style of Labels.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                      |
     * | :--------------------- | :---------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                    |
     * | Changed transparency   | (solidFill) => solidFill.setA(80)                                             |
     * | Hidden                 | ~~*emptyFill*~~ Not supported, to hide **only** Labels use *transparentFill*  |
     *
     * @param   value   Either a VisibleFill object or a function, which will be used to create a new VisibleFill based on current value.
     * @returns         New VisibleTicks object
     */
    setLabelFillStyle(style: VisibleFill | ImmutableMutator<VisibleFill>): this;
    /**
     * Get fill style of Label.
     * @return  Fill style of Label as a VisibleFill object
     */
    getLabelFillStyle(): VisibleFill;
    /**
     * Construct a new VisibleTicks object based on this one, but with modified Label font.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                          |
     * | :--------------------- | :------------------------------------------------ |
     * | Specified FontSettings | new FontSettings({ size: 24, style: 'italic' })   |
     * | Set to **bold**        | (fontSettings) => fontSettings.setWeight('bold')  |
     * @param   value   Either a FontSettings object or a function, which will be used to create a new FontSettings based on current value.
     * @return          New VisibleTicks object
     */
    setLabelFont(font: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Labels.
     * @return  FontSettings object
     */
    getLabelFont(): FontSettings;
    /**
     * Set padding after label as pixels.
     * @param   padding Padding after label as pixels.
     * @return          New VisibleTicks object with modified Label padding
     */
    setLabelPadding(padding: pixel): this;
    /**
     * Get padding after label as pixels.
     * @return  Padding after label as pixels.
     */
    getLabelPadding(): pixel;
}
/**
 * Singleton object which is used to disable *Axis* *Ticks*. Use with *Axis*.**setTickStyle()**
 *
 * When *emptyTick* is used, the whole logic of creating *Axis Ticks* is skipped, which results in saved performance.
 */
export declare const emptyTick: TickStyle;
/**
 * EllipseSeries, implementation of FigureSeries that simply plots individual ellipses (using Arcs).
 */
/**
 * Data type that defines a ellipse shape
 */
export interface EllipseDimensions {
    /**
     * X coordinate of ellipses center.
     */
    readonly x: number;
    /**
     * Y coordinate of ellipses center.
     */
    readonly y: number;
    /**
     * X radius of ellipse.
     */
    readonly radiusX: number;
    /**
     * Y radius of ellipse
     */
    readonly radiusY: number;
}
/**
 * Class for series visual that is an Ellipse.
 */
export declare class EllipseFigure extends CustomizableFigure {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    protected readonly _figureBoundsChanged: () => void;
    protected dimensions: EllipseDimensions;
    /**
     * @param   _layer                  Rendering layer
     * @param   scale                   Rendering scale
     * @param   _remove                 Callback that is called when Figure.dispose() is called.
     * @param   _restore                Callback that is called when Figure.restore() is called.
     * @param   _figureBoundsChanged    Callback that is called when Figure boundaries are changed
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<Figure>, _restore: RestoreHandler<Figure>, _figureBoundsChanged: () => void);
    /**
     * Get boundaries that contain figure.
     * @return  Interval<Point>
     */
    getBoundaries(): Interval<Point>;
    /**
     * Set new dimensions for figure.
     * @param   dimensions  Dimensions
     * @return              Object itself
     * @sideEffect          Owning series will be informed of change in size, possible initiating scrolling.
     */
    setDimensions(dimensions: EllipseDimensions): this;
    /**
     * Get current dimensions of figure.
     * @return  Dimensions
     */
    getDimensions(): EllipseDimensions;
    /**
     * Set fill style of Ellipse.
     * @param   fillStyle   FillStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Ellipse.
     * @return              FillStyle object
     */
    getFillStyle(): FillStyle;
    /**
     * Set fill style of Ellipse when highlighted.
     * @param   fillStyle   FillStyle object or mutator to modify existing one or undefined for auto assignment
     * @return              Object itself
     */
    setFillStyleHighlight(fillStyle: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get fill style of Ellipse when highlighted.
     * @return              FillStyle object or undefined for auto assignment
     */
    getFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set stroke style of Ellipse.
     * @param   value   LineStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of Ellipse.
     * @return              LineStyle object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of Ellipse when highlighted.
     * @param   value   LineStyle object or mutator to modify existing one or undefined for auto assignment
     * @return              Object itself
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke style of Ellipse when highlighted.
     * @return              LineStyle object or undefined for auto assignment
     */
    getStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
    /**
     * Return some dominant fill style of the figure
     * @returns     FillStyle object
     */
    getDominantStyle(): FillStyle;
}
/**
 * Implementation of EllipseSeries
 */
export declare class EllipseSeries extends SimpleFigureSeries<EllipseFigure, FigureSeriesFormatter<EllipseFigure, EllipseSeries>, EllipseDimensions> {
    /**
     * Add new figure to the series.
     * @param   dimensions  Dimensions that figure must represent
     * @return  Created figure
     */
    add(dimensions: EllipseDimensions): EllipseFigure;
}
/**
 * Abstract figure class for series visuals that are formed of multiple primitive shapes.
 * @hidden Internal class
 */
export declare abstract class Figure extends UIObject implements Disposable, Highlightable {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    private readonly _removeFigure;
    private readonly _restoreFigure;
    /**
     * Figure implementations should add primitive shapes in their constructors using
     * this.addShape( layer.addX( ... ) ) for proper functionality!
     *
     * @param   _layer   Rendering layer. Used to create primitive shapes
     * @param   scale   Rendering scale
     * @param   _removeFigure  Callback that is called when Figure.dispose() is called
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _removeFigure: RemoveHandler<Figure>, _restoreFigure: RestoreHandler<Figure>);
    /**
     * Return some dominant fill style of the figure
     * @returns     FillStyle object
     */
    abstract getDominantStyle(): FillStyle;
    /**
     * Dispose shapes from rendering layer
     */
    dispose(): this;
    /**
     * @return True if all shapes are disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Restore shapes to the rendering layer.
     */
    restore(): this;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
    /**
     * @return True for highlighted state of object and false for basic
     */
    getHighlighted: () => boolean;
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return     Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
}
/**
 * Implementation of SeriesXY that uses abstract 'Figures' to display segments
 *
 */
/**
 * Type for styler function for Figure
 * @param   figure  Figure
 */
export declare type FigureStyler<T extends Figure> = (figure: T) => void;
/**
 * Type of FigureConstructor
 * Basically any kind of constructor for 'PlottableFigure' object
 * @hidden
 */
export declare type FigureConstructor<T extends Figure> = new (...args: any[]) => T;
/**
 * Abstract base class for series based on figures.
 * @hidden Internal class
 */
export declare abstract class FigureSeries<FigureType extends Figure, CursorPointInterface extends CursorPoint<SeriesXY>> extends SeriesXY<FigureType, CursorPointInterface> {
    /**
     * Clear all data from the series
     * @returns         Series itself for fluent interface
     */
    clear(): this;
}
/**
 * Extension of Figure to allow changing of individual figure boundaries from user triggered customizations.
 * @hidden Internal class
 */
export declare abstract class CustomizableFigure extends Figure {
    /**
     * Get boundaries that contain figure.
     * @return  Interval<Point>
     */
    abstract getBoundaries(): Interval<Point>;
}
/**
 * Base class for simple figure series that are designed for low amounts of figures.
 * Adds unified API for adding segments and always returns created figures, which allows users
 * to apply individual style upon each figure. Also gives user direct access to any created figures for full customizability.
 * @hidden Internal class
 */
export declare abstract class SimpleFigureSeries<FigureType extends CustomizableFigure, FormatterType extends FigureSeriesFormatter<FigureType, any>, InputType> extends FigureSeries<FigureType, SimpleFigureSeriesCursorPoint<FigureType>> {
    /**
     * Add new figure to the series.
     * @param   dimensions  Dimensions that figure must represent
     * @return              Created figure
     */
    abstract add(dimensions: InputType): FigureType;
    /**
     * Set style for all figures of series.
     * NOTE: Because the function is applied for each figure added, it is not advised to create any objects inside the function.
     * Instead they should be previously cached and later referred to.
     *
     * Example usage:
     *
     * | Desired result | Argument          | Explanation                                                                               |
     * | :------------- | :---------------- | :---------------------------------------------------------------------------------------- |
     * | Explicit style | (figure) => ...   | The type of 'figure' is equal to type parameter: FigureType                               |
     * @param   styler  Styler function that is applied to all existing and newly added segments
     * @return          Object itself
     */
    setDefaultStyle(styler: FigureStyler<FigureType>): this;
    /**
     * Set highlight mode of series.
     * Defines how mouse affects highlighting of figures.
     * @param   highlightMode   HighlightMode
     * @return                  Object itself
     */
    setHighlightMode(highlightMode: HighlightModes): this;
    /**
     * Get highlight mode of series.
     * Defines how mouse affects highlighting of figures.
     * @return                  HighlightMode
     */
    getHighlightMode(): HighlightModes;
    /**
     * Method for customizing contents of ResultTables when pointing at this Series.
     * @param   formatter   Function which builds ResultTable content.
     *                      See definition of FigureSeriesFormatter for supplied formatting information.
     * @return              Object itself
     */
    setResultTableFormatter(formatter: FormatterType): this;
    /**
     * Get ResultTable Formatter.
     * @return  Function which builds ResultTable content for the Series.
     */
    getResultTableFormatter(): FormatterType;
    /**
     * Solves the nearest datapoint to a given coordinate on screen.
     * @param   location    Location on screen
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromScreen(location: Point): undefined | SimpleFigureSeriesCursorPoint<FigureType>;
    /**
     * Solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: FigureType): undefined | SimpleFigureSeriesCursorPoint<FigureType>;
    /**
     * Clear all data from the series
     * @returns         Series itself for fluent interface
     */
    clear(): this;
    /**
     * @return Max X value of the series
     */
    getXMax(): number;
    /**
     * @return Min X value of the series
     */
    getXMin(): number;
    /**
     * @return Max Y value of the series
     */
    getYMax(): number;
    /**
     * @return Min Y value of the series
     */
    getYMin(): number;
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
}
/**
 * Interface for CursorPoints that point to a Figure of SimpleFigureSeries.
 * Used to pack information about pointed segment to users.
 */
export interface SimpleFigureSeriesCursorPoint<FigureType extends Figure> extends CursorPoint<SimpleFigureSeries<any, any, any>> {
    /**
     * Pointed figure.
     */
    figure: FigureType;
}
/**
 * Interface for a function which builds ResultTable content when pointing at a FigureSeries.
 * @param   tableContentBuilder     Builder that is used to build contents of ResultTable.
 *                                  Use addRow() method for adding content.
 * @param   series                  Series
 * @param   segment                 Figure that is pointed at. This type is abstract and depends on the type of Series in question.
 *                                  For example, if you are using a BoxSeries this 'figure' will be of type: "BoxFigure".
 * @return                          TableContentBuilder that was supplied
 */
export declare type FigureSeriesFormatter<FigureType extends CustomizableFigure, P extends SimpleFigureSeries<FigureType, any, any>> = <T extends TableContentBuilder>(tableContentBuilder: T, series: P, figure: FigureType) => T;
/**
 * RectSeries, implementation of FigureSeries that simply plots individual 'Rect' shapes
 */
/**
 * Interface for defining dimensions of a Rectangle with position and size.
 */
export interface RectanglePositionAndSize {
    /**
     * X coordinate of rectangles bottom-left corner.
     */
    readonly x: number;
    /**
     * Y coordinate of rectangles bottom-left corner.
     */
    readonly y: number;
    /**
     * Width of rectangle
     */
    readonly width: number;
    /**
     * Height of rectangle
     */
    readonly height: number;
}
/**
 * Interface for defining dimensions of a Rectangle with two locations.
 */
export interface RectangleTwoPoints {
    /**
     * X coordinate of rectangles bottom-left corner.
     */
    readonly x1: number;
    /**
     * Y coordinate of rectangles bottom-left corner.
     */
    readonly y1: number;
    /**
     * X coordinate of rectangles top-right corner.
     */
    readonly x2: number;
    /**
     * Y coordinate of rectangles top-right corner.
     */
    readonly y2: number;
}
/**
 * Class for series visual that is a Rectangle.
 */
export declare class RectangleFigure extends CustomizableFigure {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    protected readonly _figureBoundsChanged: () => void;
    /**
     * @param   _layer                  Rendering layer
     * @param   scale                   Rendering scale
     * @param   _remove                 Callback that is called when Figure.dispose() is called
     * @param   _restore                Callback that is called when Figure.restore() is called
     * @param   _figureBoundsChanged    Callback that is called when Figure boundaries are changed
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<Figure>, _restore: RestoreHandler<Figure>, _figureBoundsChanged: () => void);
    /**
     * Get boundaries that contain figure.
     * @return  Interval<Point>
     */
    getBoundaries(): Interval<Point>;
    /**
     * Set new dimensions for figure.
     * @param   dimensions  Dimensions as either of supported Rectangle interfaces
     * @return              Object itself
     * @sideEffect          Owning series will be informed of change in size, possible initiating scrolling.
     */
    setDimensions(dimensions: RectanglePositionAndSize | RectangleTwoPoints): this;
    /**
     * Get current dimensions of figure as interface 'RectanglePositionAndSize'.
     * @return  RectanglePositionAndSize
     */
    getDimensionsPositionAndSize(): RectanglePositionAndSize;
    /**
     * Get current dimensions of figure as interface 'RectangleTwoPoints'.
     * @return  RectangleTwoPoints
     */
    getDimensionsTwoPoints(): RectangleTwoPoints;
    /**
     * Set fill style of Rectangle.
     * @param   fillStyle   FillStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Rectangle.
     * @return              FillStyle object
     */
    getFillStyle(): FillStyle;
    /**
     * Set fill style of Rectangle when highlighted.
     * @param   fillStyle   FillStyle object or mutator to modify existing one or undefined for auto assignment
     * @return              Object itself
     */
    setFillStyleHighlight(fillStyle: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get fill style of Rectangle when highlighted.
     * @return              FillStyle object or undefined for auto assignment
     */
    getFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set stroke style of Rectangle.
     * @param   value       LineStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of Rectangle.
     * @return              LineStyle object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of Rectangle when highlighted.
     * @param   value   LineStyle object or mutator to modify existing one or undefined for auto assignment
     * @return              Object itself
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke style of Rectangle when highlighted.
     * @return              LineStyle object or undefined for auto assignment
     */
    getStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
    /**
     * Return some dominant fill style of the figure
     * @returns     FillStyle object
     */
    getDominantStyle(): FillStyle;
}
/**
 * Series for that lets user draw Rectangles with independent figures.
 */
export declare class RectangleSeries extends SimpleFigureSeries<RectangleFigure, FigureSeriesFormatter<RectangleFigure, RectangleSeries>, RectanglePositionAndSize | RectangleTwoPoints> {
    /**
     * Add new figure to the series.
     * @param   dimensions  Dimensions that figure must represent
     * @return              Created figure
     */
    add(dimensions: RectanglePositionAndSize | RectangleTwoPoints): RectangleFigure;
}
/**
 * LineSeries, abstract implementation of FigureSeries that simply plots individual 'Line' shapes
 */
/**
 * Data structure that defines dimensions of a line-segment
 */
export interface SegmentDimensions {
    /**
     * X value of start location
     */
    startX: number;
    /**
     * Y value of start location
     */
    startY: number;
    /**
     * X value of end location
     */
    endX: number;
    /**
     * Y value of end location
     */
    endY: number;
}
/**
 * Class for series visual that is a Segment.
 */
export declare class SegmentFigure extends CustomizableFigure {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    protected readonly _figureBoundsChanged: () => void;
    /**
     * Dimensions of figure.
     */
    protected dimensions: SegmentDimensions;
    /**
     * @param   _layer          Rendering layer
     * @param   scale           Rendering scale
     * @param   _remove         Callback that is called when Figure.dispose() is called
     * @param   _restore        Callback that is called when Figure.restore() is called
     * @param   _figureBoundsChanged    Callback that is called when Figure boundaries are changed
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<Figure>, _restore: RestoreHandler<Figure>, _figureBoundsChanged: () => void);
    /**
     * Get boundaries that contain figure.
     * @return  Interval<Point>
     */
    getBoundaries(): Interval<Point>;
    /**
     * Set new dimensions for figure.
     * @param   dimensions  Dimensions
     * @return              Object itself
     * @sideEffect          Owning series will be informed of change in size, possible initiating scrolling.
     */
    setDimensions(dimensions: SegmentDimensions): this;
    /**
     * Get current dimensions of figure.
     * @return  Dimensions
     */
    getDimensions(): SegmentDimensions;
    /**
     * Set stroke style of Segment.
     * @param   value       FillStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of Segment.
     * @return              FillStyle object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of Segment when highlighted.
     * @param   value   FillStyle object or mutator to modify existing one or undefined for auto assignment
     * @return              Object itself
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke style of Segment when highlighted.
     * @return              FillStyle object or undefined for auto assignment
     */
    getStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
    /**
     * Return some dominant fill style of the figure
     * @returns     FillStyle object
     */
    getDominantStyle(): FillStyle;
}
/**
 * Series for that lets user draw Segments with independent figures.
 */
export declare class SegmentSeries extends SimpleFigureSeries<SegmentFigure, FigureSeriesFormatter<SegmentFigure, SegmentSeries>, SegmentDimensions> {
    /**
     * Add new figure to the series.
     * @param   dimensions  Dimensions that figure must represent
     * @return              Created figure
     */
    add(dimensions: SegmentDimensions): SegmentFigure;
}
/**
 * Implementation of *SeriesXY* for visualizing a collection of progressive *AreaPoints*
 * (which consist of one *X*-value, and two *Y*-values) by filling the area between the points two *Y*-values.
 *
 * Composed of the areas *fill* and *border*, both of which have two possible styles:
 * - **High**
 * - **Low**. This is used for *AreaPoints* whose *high*-value is **lower** than the *low*-value.
 *
 * *AreaRangeSeries* are created with *ChartXY*.**addAreaRangeSeries()**.
 */
export declare class AreaRangeSeries extends RangeSeries {
    /**
     * Add point or array of points to the dataset.
     * @param   points   Single new point or an array of new points.
     * @returns          Series itself for fluent interface.
     */
    add(data: AreaPoint | AreaPoint[]): this;
    /**
     * Set fill style of high area of the Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | ~~*emptyFill*~~                        |
     *
     * @param value  Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns      Series itself for fluent interface.
     */
    setHighFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set fill style of low area of the Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param value  Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns      Series itself for fluent interface.
     */
    setLowFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set fill style of high area of the Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    setHighFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
    * Set fill style of low are of the Series when it is highlighted.
    *
    * | Desired result         | Argument                                                                                  |
    * | :--------------------- | :---------------------------------------------------------------------------------------- |
    * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
    * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
    * | Hidden                 | *emptyFill*                                                                               |
    * | Automatic              | undefined                                                                                 |
    *
    * @param value  Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
    * @returns      Series itself for fluent interface.
    */
    setLowFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Set style of the Series high stroke.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~       Not supported, to hide border use *transparentLine*                     |
     *
     * @param value  Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @returns      Series itself for fluent interface.
     */
    setHighStrokeStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
    * Set style of the Series low stroke.
    *
    * | Desired result         | Argument                                                                                  |
    * | :--------------------- | :---------------------------------------------------------------------------------------- |
    * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
    * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
    * | Hidden                 | ~~*emptyLine*~~        Not supported, to hide border use *transparentLine*                         |
    *
    * @param value  Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
    * @returns      Series itself for fluent interface.
    */
    setLowStrokeStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Set style of the Series high stroke when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted border use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value or
     *                  undefined for automatic value based on normal style.
     * @returns         Chart itself
     */
    setHighStrokeStyleHighlight(value: SolidLine | ImmutableMutator<SolidLine> | undefined): this;
    /**
     * Set style of the Series low stroke when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted stroke use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value or
     *                  undefined for automatic value based on normal style.
     * @returns         Chart itself
     */
    setLowStrokeStyleHighlight(value: SolidLine | ImmutableMutator<SolidLine> | undefined): this;
    /**
     * Get a current fill style used for the coloring of the high area in the series.
     * @returns      Current fill style used for the coloring of the high area in the series.
     */
    getHighFillStyle(): FillStyle;
    /**
     * Get a current highlight fill style used for the coloring of the high area by series.
     * @returns     Current highlight fill style used for the coloring of the high area by series.
     */
    getHighFillStyleHighlight(): FillStyle;
    /**
     * Get a current fill style used for the coloring of the low area in the series.
     * @returns      Current fill style used for the coloring of the low area in the series.
     */
    getLowFillStyle(): FillStyle;
    /**
     * Get a current highlight fill style used for the coloring of the low area by series.
     * @returns     Current highlight fill style used for the coloring of the low area by series.
     */
    getLowFillStyleHighlight(): FillStyle;
    /**
     * Get a current line style of a stroke used for the coloring of the high border in the series.
     * @returns     Current line style of a stroke used for the coloring of the high border.
     */
    getHighStrokeStyle(): LineStyle;
    /**
     * Get a current line style of a border used for the coloring of the high border by series.
     * @returns     Current line style of a border used for the coloring of the high border by series.
     */
    getHighStrokeStyleHighlight(): LineStyle;
    /**
     * Get a current line style of a border used for the coloring of the low border in the series.
     * @returns     Current line style of a border used for the coloring of the low border.
     */
    getLowStrokeStyle(): LineStyle;
    /**
     * Get a current line style of a border used for the coloring of of the low border by series.
     * @returns     Current line style of a border used for the coloring of the low border by series.
     */
    getLowStrokeStyleHighlight(): LineStyle;
}
/**
 * The abstact class implements the most part of general logic for mountains.
 * The series contains the following elements:
 * - Junction area with stylable and switchable fill styles for High and Low values.
 * - Line with points for High values border.
 * - Line with points for Low values border.
 * @hidden Internal class
 */
export declare abstract class RangeSeries extends SeriesXY<Junction> {
    /**
     * Clear all points and segments from the dataset.
     * @returns         Series itself for fluent interface
     */
    clear(): this;
    /**
     * Calculate amount points
     * TODO: recalculation might be slow, in production it has to be moved to caching if it would be needed
     * @return Amount of points in series
     */
    getPointsAmount(): number;
    /**
     * Set if cursor interpolates solved data-points along series by default.
     * @param   state   Boolean flag
     * @returns         Object itself for fluent interface
     */
    setCursorInterpolationEnabled(state: boolean): this;
    /**
     * Get if cursor interpolates solved data-points along series by default.
     * @returns         Boolean flag
     */
    getCursorInterpolationEnabled(): boolean;
    /**
     * Set amount of points that should be kept around at all times (data-cleaning won't touch them).
     * NOTE: The actual data starts if there is at least 1 full segment (>8000 points normally).
     * @param   maxPointCount  Guaranteed amount of visible points. If undefined or 0 is passed, data-cleaning will be disabled.
     * @returns                Object itself
     */
    setMaxPointCount(maxPointCount?: number): this;
    /**
     * Get amount of points that series should keep around at all times (data-cleaning won't touch them).
     * @return  Number of points, or undefined if data-cleaning is disabled
     */
    getMaxPointCount(): number | undefined;
    /**
     * Method for customizing contents of ResultTables when pointing at this Series.
     * @param   formatter   Function which builds ResultTable content.
     *                      See definition of RangeSeriesFormatter for supplied formatting information.
     * @return              Object itself
     */
    setResultTableFormatter(formatter: RangeSeriesFormatter): this;
    /**
     * Get ResultTable Formatter.
     * @return  Function which builds ResultTable content for RangeSeries.
     */
    getResultTableFormatter(): RangeSeriesFormatter;
    /**
     * @return Max X value of the series
     */
    getXMax(): number | undefined;
    /**
     * @return Min X value of the series
     */
    getXMin(): number | undefined;
    /**
     * @return Max Y value of the series
     */
    getYMax(): number | undefined;
    /**
     * @return Min Y value of the series
     */
    getYMin(): number | undefined;
    /**
     * Tell the owning chart to remove this series.
     * @return  Object itself.
     */
    dispose(): this;
    /**
     * Tell the owning chart to restore this series.
     * @return  Object itself.
     */
    restore(): this;
    /**
     * Method that solves the nearest datapoint on mounatain to a given coordinate on screen.
     * @param   location    Location on screen
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromScreen(location: Point, interpolate?: boolean): undefined | CursorPoint;
    /**
     * Method that solves the nearest datapoint on mounatain to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: Junction, interpolate?: boolean): undefined | CursorPoint;
}
/**
 * Interface for a function which builds ResultTable content when pointing at a RangeSeries.
 * @param   tableContentBuilder     Builder that is used to build contents of ResultTable.
 *                                  Use addRow() method for adding content.
 * @param series                    RangeSeries.
 * @param position                  Position on the axis.
 * @param high                      High value on the axis.
 * @param low                       Low value on the axis.
 * @return                          TableContentBuilder that was supplied
 */
export declare type RangeSeriesFormatter = <T extends TableContentBuilder>(tableContentBuilder: T, series: RangeSeries, position: number, high: number, low: number) => T;
/**
 * Enum for selecting step behaviour for *StepSeries*.
 *
 * This must be specified when the *StepSeries* is created, and can't be changed afterwards.
 */
export declare enum StepOptions {
    /**
     * The y-value changes before the x-value.
     */
    before = 0,
    /**
     * The y-value changes at the midpoint of each pair of adjacent x-values.
     */
    middle = 0.5,
    /**
     * The y-value changes after the x-value.
     */
    after = 1
}
/**
 * Class for visualization of polynom function.
 */
export declare class SplineSeries extends PointLineSeries {
    /**
     * Solves the nearest datapoint of a given coordinate on screen
     * @param   location    Location on screen
     * @param   interpolate Should interpolate? If omitted, defaults to setting of series
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromScreen(location: Point, interpolate?: boolean): undefined | CursorPoint;
    /**
     * Solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve data-point from
     * @param   interpolate Should interpolate? If omitted, defaults to setting of series
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: LineSet | PointSet, interpolate?: boolean): undefined | CursorPoint;
    /**
     * Set amount of points that should be kept around at all times (data-cleaning won't touch them).
     * NOTE: The actual data cleaning can only be started if there is at least 1 full segment (about 8000 points).
     * @param   maxPointCount  Guaranteed amount of visible points. If undefined or 0 is passed, data-cleaning will be disabled.
     * @returns                 Object itself
     */
    setMaxPointCount(maxPointCount: number | undefined): this;
}
/**
 * Step Series that plots incoming data-points using Step preprocessing function.
 */
export declare class StepSeries extends PointLineSeries {
    private _step;
    /**
     * @param engine                Drawing Engine
     * @param _chart                Parent Chart
     * @param _removeFromChart      Handler for removing reference to series from owning chart
     * @param axisX                 Axis X
     * @param axisY                 Axis Y
     * @param axisXAttachHandler    Attach handler for Axis X
     * @param axisYAttachHandler    Attach handler for Axis Y
     * @param _newUILayer           Factory for creating new UI layers for drawing SeriesMarkers
     * @param _pointShape           Shape for points of PointSeries
     * @param _step                 Step function, which definces how series will be visualized.
     * @hidden
     */
    constructor(engine: LayerXY, _chart: ChartXY, _removeFromChart: RemoveHandler<StepSeries>, _restoreFromChart: RestoreHandler<StepSeries>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _pointShape: PointShape, _step: StepOptions);
}
export {};
/**
 * The types of events of simple polygon vertices for polygon partitioning.
 */
export declare type VertexType = 'START' | 'END' | 'REGULAR' | 'SPLIT' | 'MERGE';
/**
 * A generic container for storing the information about diagonal, which joins two simple polygon vertices.
 * The diagonal cuts off y-monotone polygon ear from a simple polygon.
 * @property    begin: The beginning of a diagonal represented by a doubly-connected node, or simple polygon vertex.
 * @property    end  : The end of a diagonal represented by a doubly-connected node, or simple polygon vertex.
 */
export interface Diag {
}
/**
 * A generic container for storing references to the specific polygon vertices in the original list of points and assign tag to the line.
 * @property    begin: Reference index to vertex index in the original list of points, which is the beginning of polygon edge.
 * @property    end  : Reference index to vertex index in the original list of points which is the end of polygon edge.
 * @property    tag  : Reference index or the order in the list of polygon edges.
 */
export interface Edge {
}
/**
 * A generic container for storing helper references to the specific polygon edge and doubly-connected node (Simple Polygon vertex).
 * @property    setment: Directly on a left polygon edge, to which the Simple Polygon vertex belongs to.
 * @property    vertex : Reference index to Simple Polygon vertex in a Priority Queue.
 */
export interface EventEdge {
}
/**
 * Generic container for storing information about Simple Polygon vertex as doubly-connected node.
 * @property    index:   Reference to the current vertex index in the original list of points.
 * @property    prev :   Reference to the previous vertex index in the original list of points (previous point in a polyline).
 * @property    next :   Reference to the next vertex index in the original list of points (next point in a polyline).
 * @property    type :   Type of a turn vertex, which is used as an event to process the polygon partitioning into y-monotones.
 */
export interface SimpleVertex {
}
/**
 * A generic container for storing a helper edges for a specific doubly-connected node (Simple Polygon vertex).
 * @property    edge :  Reference to the directly on a left line segment in the list of polygon edges.
 */
export interface Helper extends EventEdge {
}
/**
 * A generic container for storing the information about Monotone Polygon vertex.
 * @property    vertex: Vector in cartesian coordinates space.
 * @property    index : Reference index to current vertex in the original list of points.
 * @property    chain : Reference to which chain the vertex belongs to. [-1: Lower chain, 0: Begin or End of chains, 1: Upper chain]
 */
export interface MonotoneVertex {
}
export {};
/**
 * File contains interfaces and builder for CheckBox
 */
/**
 * Interface for 'CheckBox'.
 */
export interface UICheckBox<BackgroundType extends UIBackground = UIBackground, PictureOffType extends UIButtonPicture = UIButtonPicture, PictureOnType extends UIButtonPicture = UIButtonPicture> extends UIPartWithBackground<BackgroundType>, CustomizableText, StylableButton, Switchable {
}
/**
 * Interface for 'CheckBox'-builder.
 */
export interface UICheckBoxBuilder<BackgroundType extends UIBackground = UIBackground, PictureOffType extends UIButtonPicture = UIButtonPicture, PictureOnType extends UIButtonPicture = UIButtonPicture> extends UIElementBuilder<UICheckBox<BackgroundType, PictureOffType, PictureOnType>> {
    /**
     * Make new CheckBoxBuilder with different background.
     * @param   newBackground   Constructor for desired Background. See UIBackgrounds for a collection of options.
     */
    setBackground<NewBackgroundType extends BackgroundType & InternalBackground>(newBackground: BackgroundConstructor<NewBackgroundType>): UICheckBoxBuilder<NewBackgroundType, PictureOffType, PictureOnType>;
    /**
     * Make new CheckBoxBuilder with different Picture OFF.
     * @param   newPictureOff   Constructor for desired Picture OFF. See UIButtonPictures for a collection of options.
     * @return                  New CheckBoxBuilder with different Picture OFF.
     */
    setPictureOff<NewPictureOffType extends PictureOffType>(newPictureOff: PrimitiveUiConstructor<NewPictureOffType>): UICheckBoxBuilder<BackgroundType, NewPictureOffType, PictureOnType>;
    /**
     * Make new CheckBoxBuilder with different Picture ON.
     * @param   newPictureOff   Constructor for desired Picture ON. See UIButtonPictures for a collection of options.
     * @return                  New CheckBoxBuilder with different Picture ON.
     */
    setPictureOn<NewPictureOnType extends PictureOnType>(newPictureOn: PrimitiveUiConstructor<NewPictureOnType>): UICheckBoxBuilder<BackgroundType, PictureOffType, NewPictureOnType>;
}
/**
 * File contains interfaces and builder for TextBox
 */
/**
 * Interface for 'TextBox'.
 */
export interface UITextBox<BackgroundType extends UIBackground = UIBackground> extends UIPartWithBackground<BackgroundType>, CustomizableText {
}
/**
 * Interface for 'TextBox'-builder.
 */
export interface UITextBoxBuilder<BackgroundType extends UIBackground = UIBackground> extends UIElementBuilder<UITextBox<BackgroundType>> {
    /**
     * Make new TextBoxBuilder with different background
     * @param   newBackground   Constructor for desired Background. See UIBackgrounds for a collection of options.
     */
    setBackground<NewBackgroundType extends BackgroundType & InternalBackground>(newBackground: BackgroundConstructor<NewBackgroundType>): UITextBoxBuilder<NewBackgroundType>;
}
/**
 * Interface for 'PointableTextBox'.
 */
export interface PointableTextBox<BackgroundType extends UIBackground = UIBackground> extends UITextBox<BackgroundType>, Pointable {
}
/**
 * Interface for 'PointableTextBox'-builder.
 */
export interface UIPointableTextBoxBuilder<BackgroundType extends PointableBackground = PointableBackground> extends UIElementBuilder<PointableTextBox<BackgroundType>> {
    /**
     * Make new PointableTextBoxBuilder with different background.
     * @param   newBackground   Constructor for desired PointableBackground. Currently only UIBackgrounds.Arrow is available.
     */
    setBackground<NewBackgroundType extends BackgroundType & InternalBackground>(newBackground: PointableBackgroundConstructor<NewBackgroundType>): UIPointableTextBoxBuilder<NewBackgroundType>;
}
/**
 * File contains interfaces and classes for primitive UI buttons
 */
/**
 * Indicates object whose size can be fitted into an arbitrary Vec2
 * @hidden
 */
export interface Fittable {
    /**
     * Fit object to bounding box.
     * @param   bounds  Bounds in pixels
     * @return          Object itself
     */
    fitTo(bounds: Point): this;
}
/**
 * Type requirement for Pictures of Buttons.
 */
export interface UIButtonPicture extends BorderedPicture, Fittable {
}
/**
 * Switchable UI element with separate visuals for (ON/OFF) states.
 * @hidden Internal class
 */
export declare class Button<PictureOff extends UIButtonPicture = UIButtonPicture, PictureOn extends UIButtonPicture = UIButtonPicture> extends InternalUIElement implements Highlightable {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    /**
     * @param _layer                 Layer of drawing engine
     * @param scale                 Drawing scale of UiElement
     * @param _picOffConstructor     Constructor for OFF picture
     * @param _picOnConstructor      Constructor for ON picture
     * @param remove                Injected remove method from parent.
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _picOffConstructor: PrimitiveUiConstructor<PictureOff>, _picOnConstructor: PrimitiveUiConstructor<PictureOn>, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>);
    /**
     * Set state of switchable object
     * @param isOn  State as boolean flag
     * @returns     Object itself for fluent interface
     */
    setOn(isOn: boolean): this;
    /**
     * @return State as boolean flag
     */
    getOn: () => boolean;
    /**
     * Set fill style of checkbox when state is OFF
     * @param   value   FillStyle object or function which modifies it
     * @return          Object itself for fluent interface
     */
    setOffFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of checkbox when state is OFF
     * @return          FillStyle object
     */
    getOffFillStyle(): FillStyle;
    /**
     * Set highlighted fill style of checkbox when state is OFF
     * @param   value   FillStyle object or mutator to modify existing one or undefined for auto assigment
     * @return          Object itself for fluent interface
     */
    setOffFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get highlighted fill style of checkbox when state is OFF
     * @return          FillStyle object or undefined for auto assigment
     */
    getOffFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set style of checkbox when state is OFF
     * @param   value   LineStyle object or function which modifies it
     * @return          Object itself for fluent interface
     */
    setOffStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of checkbox when state is OFF
     * @eturn           LineStyle object
     */
    getOffStrokeStyle(): LineStyle;
    /**
     * Set size of checkbox when state is OFF.
     * @param   size    Size to fit picture as Point or pixel for squared size
     */
    setOffSize(size: Point | pixel): this;
    /**
     * Get size of checkbox in pixels when state is OFF
     */
    getOffSize(): Point;
    /**
     * Set fill style of checkbox when state is ON
     * @param   value   FillStyle object or function which modifies it
     * @return          Object itself for fluent interface
     */
    setOnFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of checkbox when state is ON
     * @return          FillStyle object
     */
    getOnFillStyle(): FillStyle;
    /**
     * Set highlighted fill style of checkbox when state is ON
     * @param   value   FillStyle object or mutator to modify existing one or undefined for auto assigment
     * @return          Object itself for fluent interface
     */
    setOnFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get highlighted fill style of checkbox when state is ON
     * @return          FillStyle object or undefined for auto assigment
     */
    getOnFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set style of checkbox when state is ON
     * @param   value   LineStyle object or function which modifies it
     * @return          Object itself for fluent interface
     */
    setOnStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of checkbox when state is ON
     * @eturn           LineStyle object
     */
    getOnStrokeStyle(): LineStyle;
    /**
     * Set size of checkbox when state is ON.
     * @param   size    Size to fit picture to as Point or pixel for squared size
     */
    setOnSize(size: Point | pixel): this;
    /**
     * Get size of checkbox in pixels when state is ON
     */
    getOnSize(): Point;
    /**
     * Restore object if it was previously disposed.
     * @returns Object itself itself for fluent interface
     */
    restore(): this;
    /**
     * Dispose object, ceasing its operation while keeping the object intact until call of 'restore'.
     * @return Object itself for fluent interface
     */
    dispose(): this;
    /**
     * @return True if all sub elements are disposed, false if not.
     */
    isDisposed(): boolean;
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return     Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
    /**
    * @return Flag is highlighted
    */
    getHighlighted(): boolean;
    /**
    * Set highlighted state
    * @param isHighlighted Highlight state of the object
    * @returns             Object itself for fluent interface
    */
    setHighlighted(isHighlighted: boolean): this;
}
/**
 * Interface for Button-builder.
 * @hidden
 */
export interface ButtonBuilder<PictureOffType extends UIButtonPicture = UIButtonPicture, PictureOnType extends UIButtonPicture = UIButtonPicture> extends UIElementBuilder<Button<PictureOffType, PictureOnType>> {
    /**
     * Make new ButtonBuilder with different Picture OFF
     */
    setPictureOff<NewPictureOffType extends PictureOffType>(newPictureOff: PrimitiveUiConstructor<NewPictureOffType>): ButtonBuilder<NewPictureOffType, PictureOnType>;
    /**
     * Make new ButtonBuilder with different Picture ON
     */
    setPictureOn<NewPictureOnType extends PictureOnType>(newPictureOn: PrimitiveUiConstructor<NewPictureOnType>): ButtonBuilder<PictureOffType, NewPictureOnType>;
}
/**
 * File contains class and builder for LegendBox and relative interfaces.
 */
/**
 * Interface for LegendBoxEntry.
 *
 * Implementations of LegendBoxEntry include:
 * - *UICheckBox*
 * - *UIButtonBox*
 */
export interface LegendBoxEntry extends UIPart, CustomizableText, StylableBackground, StylableButton, Switchable {
}
/**
 * Object which can be attached to a LegendBox
 * @hidden
 */
export interface Attachable {
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick: boolean): this;
}
/**
 * Common interface for LegendBoxPanel and UILegendBox.
 * @hidden
 */
export interface LegendBox<TitleType extends UITextBox, DefaultEntryType extends LegendBoxEntry> {
    /**
     * Add a dynamic value to LegendBox, creating a group and entries for it depending on type of value.
     * Supports series, charts and dashboards.
     * @param value             Series, Chart or Dashboard
     * @param disposeOnClick    Optional flag that determines whether clicking the LegendBoxEntry will dispose the Attached objects
     * @param tag               Optional group name
     * @param builder           Optional builder for custom entry
     * @return                  Entry attached to a Series or Collection of Entries in case of Chart or Dashboard
     */
    add: <EntryType extends LegendBoxEntry = DefaultEntryType>(value: Attachable | Chart | Dashboard, disposeOnClick?: boolean, tag?: string, builder?: UIElementBuilder<EntryType>) => EntryType | EntryType[] | EntryType[][];
}
/**
 * LegendBox that is a standalone UIElement.
 */
export declare type UILegendBox<BackgroundType extends InternalBackground = any, TitleType extends UITextBox = UITextBox, DefaultEntryType extends LegendBoxEntry = LegendBoxEntry> = UIPartWithBackground<BackgroundType> & LegendBox<TitleType, DefaultEntryType>;
/**
 * Public interface for builder of LegendBox.
 */
export interface UILegendBoxBuilder<BackgroundType extends InternalBackground = InternalBackground, TitleType extends UITextBox = UITextBox, EntryType extends LegendBoxEntry = LegendBoxEntry> extends UIElementBuilder<UILegendBox<BackgroundType>> {
    /**
     * Make new LegendBoxBuilder with different background
     * @param   newBackground   Constructor for Background
     * @return                  New LegendBoxBuilder
     */
    setBackground<NewBackgroundType extends BackgroundType>(newBackground: BackgroundConstructor<NewBackgroundType>): UILegendBoxBuilder<NewBackgroundType, TitleType>;
    /**
     * Make new LegendBoxBuilder with different alignment of entries.
     *
     * Eq. "Horizontal" meaning that the LegendBox progresses in the X-direction,
     * and aligns its groups downwards.
     * @param   alignment       Alignment for LegendBox
     * @return                  New LegendBoxBuilder
     */
    setAlignment(alignment: 'horizontal' | 'vertical'): UILegendBoxBuilder<BackgroundType, TitleType>;
    /**
     * Make new LegendBoxBuilder with different titles
     * @param   value   Either builder for new title (extends TextBox) or styler for current title type
     * @return          New LegendBoxBuilder
     */
    setTitle<NewTitleType extends TitleType>(value: UIElementBuilder<NewTitleType> | Mutator<TitleType>): UILegendBoxBuilder<BackgroundType, NewTitleType>;
    /**
     * Make new LegendBoxBuilder with different entries
     * @param   value   Either builder for new entry (extends LegendBoxEntry) or styler for current entry type
     * @return          New LegendBoxBuilder
     */
    setEntry<NewEntryType extends EntryType>(entryBuilder: UIElementBuilder<NewEntryType> | Mutator<EntryType>): UILegendBoxBuilder<BackgroundType, TitleType, NewEntryType>;
}
/**
 * File contains abstract base-classes for implementation of primitive UI elements
 */
/**
 * Type of constructor for primitive uiElement
 * @param layer Layer of drawing engine
 * @param scale Drawing scale of UiElement
 * @hidden
 */
export declare type PrimitiveUiConstructor<UiElementType extends UIElement = UIElement> = new (layer: LayerXY, scale: Vec2<Scale>, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>) => UiElementType;
/**
 * Class represents any kind of picture, it might be raster image rendered as texture,
 * just colored rectangle or polygon of another shape,
 * several different geometry shapes and so on.
 * @hidden Internal class
 */
export declare abstract class Picture extends InternalUIElement implements Highlightable {
    /**
     * Set fill style of Picture
     * @param value Fill style object or function which modifies it
     * @return      Object itself for fluent interface
     */
    setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of Picture
     */
    getFillStyle(): FillStyle;
    /**
     * Set highlight fill style of object filling
     * @param highlightStyle FillStyle for highlighted object or mutator to modify existing one or undefined for auto assignment
     * @returns         Object itself for fluent interface
     */
    setFillStyleHighlight(highlightStyle: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * @return Highlight FillStyle of the object or undefined for auto assignment
     */
    getFillStyleHighlight(): FillStyle | undefined;
    /**
     * @return True for highlighted state of object and false for basic
     */
    getHighlighted(): boolean;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return     Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
    /**
     * Dispose object, ceasing its operation while keeping the object intact until call of 'restore'.
     * @return Object itself for fluent interface
     */
    dispose(): this;
    /**
     * Restore object if it was previously disposed.
     * @returns Object itself itself for fluent interface
     */
    restore(): this;
    /**
     * @return True if all sub elements are disposed, false if not.
     */
    isDisposed(): boolean;
}
/**
 * Abstract Picture with stylable border.
 * @hidden
 */
export declare abstract class BorderedPicture extends Picture {
    /**
     * Set stoke style of Picture
     * @param value LineStyle object or function which modifies it
     * @return      Object itself for fluent interface
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of Picture
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of object when it is highlighted
     * @param value     LineStyle for highlighted object or mutator to modify existing one or undefined for auto assignment
     * @returns         Object itself for fluent interface
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * @return Highlight LineStyle of the object or undefined for auto assignment
     */
    getStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
}
/**
 * Abstract background formed with a polygon shape
 * @hidden
 */
export declare abstract class UIPolygon extends BorderedPicture implements Validatable {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    /**
     * Implementations should initialize all of their
     * Shapes and UiElements in the constructor.
     * Sub-classes must call 'updatePolygon' initially !
     * @param _layer         Layer of drawing engine
     * @param scale         Drawing scale of UiElement
     * @param polygonType   Type of polygon used for rendering shape
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, polygonType: PolygonType, remove: RemoveHandler<UIElement>, restore: RestoreHandler<UIElement>);
    /**
     * Sets the position of this UiElement relative to its origin.
     *
     * NOTE: UIElements scale can't be changed apart from when it is created.
     * @param position  Point on the UIElements scale, where its origin should be positioned
     * @return          Object itself
     */
    setPosition(position: Point): this;
    /**
     * Sets the position origin of this UiElement. Affects how the "position" of UIElement is interpreted.
     *
     * See UIOrigins for a collection of common arguments in an easy-to-read format.
     * @param   origin  Point with each plane in range [-1, 1], where 0 is middle
     * @return          Object itself
     */
    setOrigin(origin: Point): this;
}
/**
 * File contains librarys most basic primitive UI elements
 * together in one file because very similar class implementations
 */
/**
 * Class which represents a single line of text
 * @hidden Internal class
 */
export declare class UILabel extends Picture {
    /**
     * Implementations should initialize all of their
     * Shapes and UiElements in the constructor.
     * @param layer Layer of drawing engine
     * @param scale Drawing scale of UiElement
     * @hidden
     */
    constructor(layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<UIElement>, _restore: RestoreHandler<UIElement>);
    /**
     * Specify a text string.
     * @param text          The string to be rendered.
     * @returns             Object itself for fluent interface.
     */
    setText(text: string): this;
    /**
     * Get the text of the entire shape.
     * @returns             The entire text string.
     */
    getText(): string;
    /**
     * Set font of Label.
     * @param   value   FontSettings or mutator function for existing settings
     * @return          Object itself
     */
    setFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Label.
     * @return          FontSettings
     */
    getFont(): FontSettings;
}
/**
 * Rectangular UI shape that can be used as Background, Button picture or cursor PointMarker.
 */
export declare class UIRectangle extends BorderedPicture implements PointMarker, InternalBackground, UIButtonPicture {
    /**
     * Implementations should initialize all of their
     * Shapes and UiElements in the constructor.
     * @param layer Layer of drawing engine
     * @param scale Drawing scale of UiElement
     * @hidden
     */
    constructor(layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<UIElement>, _restore: RestoreHandler<UIElement>);
    /**
     * Fit object to bounding box.
     * @param   bounds  Bounds in pixels
     * @return          Object itself
     */
    fitTo: (size: Point) => this;
    /**
     * Set size of PointMarker
     * @param   size        Size of PointMarker in pixels
     * @returns             Object itself
     */
    setSize: (size: Point) => this;
}
/**
 * Circular UI shape that can be used as Background and as Button picture.
 */
export declare class UICircle extends BorderedPicture implements PointMarker, InternalBackground, UIButtonPicture {
    /**
     * @param layer Layer of drawing engine
     * @param scale Drawing scale of UiElement
     * @hidden
     */
    constructor(layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<UIElement>, _restore: RestoreHandler<UIElement>);
    /**
     * Fit object to bounding box.
     * @param   bounds  Bounds in pixels
     * @return          Object itself
     */
    fitTo(bounds: Point): this;
    /**
     * Set size of PointMarker
     * @param   size        Size of PointMarker in pixels
     * @returns             Object itself
     */
    setSize: (bounds: Point) => this;
}
/**
 * 45 degrees rotated Rectangle background.
 */
export declare class UIDiamond extends UIPolygon implements PointMarker, InternalBackground, UIButtonPicture {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    /**
     * @param _layer Layer of drawing engine
     * @param scale Drawing scale of UiElement
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<UIElement>, _restore: RestoreHandler<UIElement>);
    /**
     * Fit object to bounding box.
     * @param   bounds  Bounds in pixels
     * @return          Object itself
     */
    fitTo(bounds: Point): this;
    /**
     * Set size of PointMarker
     * @param   size        Size of PointMarker in pixels
     * @returns             Object itself
     */
    setSize: (bounds: Point) => this;
}
/**
 * Background that has a pointable 'arrow'
 */
export declare class UIPointer extends UIPolygon implements InternalBackground {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    /**
     * @param   _layer   Rendering layer
     * @param   scale   Rendering scale
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, _remove: RemoveHandler<UIElement>, _restore: RestoreHandler<UIElement>);
    /**
     * Set direction.
     * @param   direction   Enum Direction
     * @returns             Object itself for fluent interface
     */
    setDirection(direction: UIDirections): this;
    /**
     * Get direction.
     * @returns             Enum Direction
     */
    getDirection(): UIDirections;
    /**
     * Set length of Pointable head in pixels.
     * @param   length  Head length in pixels
     * @returns         Object itself for fluent interface
     */
    setPointerLength(length: pixel): this;
    /**
     * Get length of Pointable head in pixels.
     * @returns             Pixel length
     */
    getPointerLength(): pixel;
    /**
     * Set angle of Pointable in degrees.
     * @param   angle   Angle of pointer or undefined to match head & body size
     * @returns         Object itself for fluent interface
     */
    setPointerAngle(angle?: number): this;
    /**
     * Get angle of Pointable in degrees.
     * @returns         Angle in degrees
     */
    getPointerAngle(): pixel;
}
/**
 * Empty UiElement
 * @hidden Internal class
 */
export declare class EmptyUIElement extends InternalUIElement {
    /**
     * Set mouse interactions enabled or disabled
     * @param state Specifies state of mouse interactions
     * @return     Object itself for fluent interface
     */
    setMouseInteractions(state: boolean): this;
    /**
     * @return Mouse interactions state
     */
    getMouseInteractions(): boolean;
}
/**
 * Empty background.
 *
 * Indicates that the *Background* can't and shouldn't be styled as it won't be rendered.
 */
export declare class UIEmptyBackground extends EmptyUIElement implements InternalBackground {
    /**
     * @return True for highlighted state of object and false for basic
     */
    getHighlighted(): boolean;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
    /**
     * Set highlight fill style of object filling
     * @param highlightStyle    FillStyle for highlighted object or mutator to modify existing one or undefined for default highlighting style
     * @returns                 Object itself for fluent interface
     */
    setFillStyleHighlight(setter: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * @return Hightlight FillStyle of the object
     */
    getFillStyleHighlight(): FillStyle;
    /**
     * Set fill style object
     * @param value Fill style object or function which modifies it
     * @return      Object itself for fluent interface
     */
    setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * @return Current fill style object
     */
    getFillStyle(): FillStyle;
    /**
     * Set stroke style object
     * @param value     LineStyle object or function which modifies it
     * @return          Object itself for fluent interface
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * @return          Current stroke style object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke thickness in pixels
     * @param thickness Stroke thickness in pixels
     * @returns         Icon itself for fluent interface
     */
    setStrokeThickness(thickness: number): this;
    /**
     * @return Object stroke thickness
     */
    getStrokeThickness(): number;
}
/**
 * Empty PointMarker
 * @hidden Internal class
 */
export declare class EmptyPointMarker extends UIEmptyBackground implements PointMarker {
    setSize: (size: Point) => this;
}
/**
 * Angular interval object defines the minimum and maximum interval in degrees.
 */
export declare type AngleInterval = SliceInterval;
/**
 * Event handler for gauge angle interval changed
 * @param   obj             Object
 * @param   previous        Previous angle interval of the Gauge
 * @param   current         Current angle interval of the Gauge
 */
export declare type GaugeAngleIntervalEventHandler<T> = (obj: T, previous: AngleInterval, current: AngleInterval) => void;
/**
 * Class of Radial Gauge represents the type of the gauge of a circular shape.
 */
export declare abstract class RadialGauge<P extends GaugeSlice, I extends P> extends GaugeChart<P, I> {
    /**
     * Inheritend constructor from Gauge Chart
     * @param   layerSupplier       LayerSupplier. Must NOT be cached, because it contains reference to actual Engine instance.
     * @param   logoFactory         Logo factory.
     * @param   ScaleX              Injectable Scale constructor
     * @param   ScaleY              Injectable Scale constructor
     * @param   onScaleChange       Injectable subscribe method for when chart should _update its positioning logic (used for dashboard)
     * @param   panelMargin         Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number);
    /**
     * Set angular interval of the gauge in degrees.
     * @param start Start angle of the gauge in degrees.
     * @param end   End angle of the gauge in degrees.
     * @returns Gauge itself for fluent interface.
     */
    setAngleInterval(start: number, end: number): this;
    /**
     * Get the angular interval of the gauge.
     * @returns Angle interval object {min, max} in degrees.
     */
    getAngleInterval(): AngleInterval;
    /**
     * Apply new fill style to slice arc.
     * @param value FillStyle or mutator to modify the existing one.
     * @returns     Gauge itself for fluent interface.
     */
    setGaugeFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set stroke of gauge background
     * @param value LineStyle or mutator to modify the existing one.
     * @returns     Gauge itself for fluent interface.
     */
    setGaugeStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Subscribe to Gauge Angle Change event.
     * @returns Token of the listener.
     */
    onAngleIntervalChange(clbk: GaugeAngleIntervalEventHandler<this>): Token;
    /**
     * Remove listener with provided token.
     * @param token  Token of the listener.
     * @returns True if the listener is successfully removed and false if it is not found.
     */
    offAngleIntervalChange(token: Token): boolean;
}
/**
 * The Gauge Chart with a single solid colored slice.
 *
 * Solid Gauge extends Radial Gauge.
 * Use *GaugeChart*.**.setAngleInterval(start: number, end: number)** to set angular appearance of the Chart.
 *
 * Before setting the data, request the slice using *GaugeChart*.**getDefaultSlice()**
 * Set data range using *GaugeChart*.**setInterval(start: number, end: number)**
 * Set data using *GaugeChart*.**setValue(value: number)**
 */
export declare class SolidGauge extends RadialGauge<SolidGaugeSlice, InternalSolidGaugeSlice> {
    /**
     * Inheritend constructor from Gauge Chart
     * @param   layerSupplier       LayerSupplier. Must NOT be cached, because it contains reference to actual Engine instance.
     * @param   logoFactory         Logo factory.
     * @param   ScaleX              Injectable Scale constructor
     * @param   ScaleY              Injectable Scale constructor
     * @param   onScaleChange       Injectable subscribe method for when chart should _update its positioning logic (used for dashboard)
     * @param   panelMargin         Margin that panel should not touch around it. Used for dashboard splitters and borders.
     * @hidden
     */
    constructor(layerSupplier: LayerSupplier, logoFactory?: LogoFactory, ScaleX?: ScaleFactory, ScaleY?: ScaleFactory, onScaleChange?: (handler: () => void) => void, panelMargin?: number);
    /**
     * Get the slice of the gauge.
     * @returns Solid Gauge Slice object for further modification.
     */
    getDefaultSlice(): SolidGaugeSlice;
    /**
     * Set the Auto Scaling mode enabled or disabled.
     * @param state True - autofit is enabled, otherwise - False.
     * @returns Gauge itself for fluent interface.
     */
    setAutoScaling(state: boolean): this;
    /**
     * Get the current state of the Auto Scaling mode.
     * @returns True - autofit is enabled, otherwise - False.
     */
    getAutoScaling(): boolean;
    /**
     * Set a new number formatter for the Data label.
     * @param formatter Number formatter
     * @returns Gauge itself for fluent interface.
     */
    setDataLabelFormater(formatter: Intl.NumberFormat): this;
    /**
     * Get the formatter for the Data label.
     * @returns Number formatter object.
     */
    getDataLabelFormater(): Intl.NumberFormat;
    /**
     * Set a new number formatter for the scale labels.
     * @param formatter Number formatter
     * @returns Gauge itself for fluent interface.
     */
    setIntervalLabelFormatter(formatter: Intl.NumberFormat): this;
    /**
     * Get the formatter for the scale labels.
     * @returns Number formatter object.
     */
    getIntervalLabelFormatter(): Intl.NumberFormat;
    /**
     * Set padding between Gauge and interval labels in pixels.
     * @param   padding     Number with pixel margin
     * @returns Gauge itself for fluent interface.
     */
    setIntervalLabelPadding(padding: number): this;
    /**
     * Get padding around Chart in pixels.
     * @return  Padding datastructure
     */
    getIntervalLabelPadding(): number;
    /**
     * Set thickness of the gauge.
     * @param thickness
     * @returns Gauge itself for fluent interface.
     */
    setThickness(thickness: number): this;
    /**
     * Set font of Gauge Data Label.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                          |
     * | :--------------------- | :------------------------------------------------ |
     * | Specified FontSettings | new FontSettings({ size: 24, style: 'italic' })   |
     * | Set to **bold**        | (fontSettings) => fontSettings.setWeight('bold')  |
     *
     * @param   value   Either a FontSettings object or a function, which will be used to create a new FontSettings based on current value.
     * @returns         Gauge itself for fluent interface.
     */
    setDataLabelFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of Gauge Data Label.
     * @returns         FontSettings object for gauge data lable.
     */
    getDataLabelFont(): FontSettings;
    /**
     * Get the minimum size of the chart.
     * @returns Size {x, y} or undefined
     */
    getMinimumSize(): Point | undefined;
}
/**
 * Class of Solid colored slice Gauge slice.
 * The slice is represented as a single radial Arc shape.
 */
export declare abstract class SolidGaugeSlice extends GaugeSlice {
    /**
     * Apply new fill style to a slice.
     * @param value FillStyle for normal state.
     * @returns     Slice itself for a fluent interface.
     */
    abstract setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Apply new highlight fill style to a slice.
     * @param  value    FillStyle for highlighted state.,
     * if omitted then a highlight color is automatically generated.
     * @returns         Slice itself for a fluent interface.
     */
    abstract setFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Subscribe to value change event.
     * @param listener  Event listener.
     * @returns Token that is used to unsubscribe from the event
     * @hidden
     */
    onValueChange(listener: ValueChangeEventListener<SolidGaugeSlice>): Token;
    /**
     * Subscribe to interval change event.
     * @param listener  Event listener.
     * @returns Token that is used to unsubscribe from the event
     */
    onIntervalChange(listener: IntervalChangeEventListener<SolidGaugeSlice>): Token;
}
/**
 * Class contains internal implementation of the Solid Gauge Slice.
 * @hidden
 */
export declare class InternalSolidGaugeSlice extends SolidGaugeSlice {
    protected _chart: SolidGauge;
    readonly scale: Vec2<Scale>;
    protected _removeFromChart: RemoveHandler<SolidGaugeSlice>;
    protected _restoreFromChart: RestoreHandler<SolidGaugeSlice>;
    /**
     * Shape of the solid angular slice.
     */
    readonly arc: Arc;
    /**
     * Text shape to show the slice value.
     */
    readonly label: Text;
    /**
     * Text shape to show the minimum interval value.
     */
    readonly minLabel: Text;
    /**
     * Text shape to show the maximum interval value.
     */
    readonly maxLabel: Text;
    constructor(arcLayer: LayerXY, labelLayer: LayerXY, _chart: SolidGauge, scale: Vec2<Scale>, _removeFromChart: RemoveHandler<SolidGaugeSlice>, _restoreFromChart: RestoreHandler<SolidGaugeSlice>);
    plot(): void;
    /**
     * Set name for the Slice as string.
     * @param name Slice name as string.
     * @returns Slice itself for fluent interface.
     */
    setName(name: string): this;
    /**
     * Set value of Slice.
     * @param   value   Numeric value
     * @return          Slice itself
     */
    setValue(value: number): this;
    /**
     * Get value of Slice.
     * @return          Numeric value
     */
    getValue(): number;
    /**
     * Tell the owning chart to remove this component.
     * @return  Slice itself.
     */
    dispose(): this;
    /**
     * Tell the owning chart to restore this series.
     * @returns     Slice itself for fluent interface.
     */
    restore(): this;
    /**
     * Set scale interval.
     * @param  start                Start scale value
     * @param  end                  End scale value
     * @returns this for fluent interface
     */
    setInterval(start: number, end: number): this;
    /**
     * Set font of interval labels.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                          |
     * | :--------------------- | :------------------------------------------------ |
     * | Specified FontSettings | new FontSettings({ size: 24, style: 'italic' })   |
     * | Set to **bold**        | (fontSettings) => fontSettings.setWeight('bold')  |
     *
     * @param   value   Either a FontSettings object or a function, which will be used to create a new FontSettings based on current value.
     * @returns         Chart itself
     */
    setIntervalLabelsFont(value: FontSettings | ImmutableMutator<FontSettings>): this;
    /**
     * Get font of gauge interval labels.
     * @returns         FontSettings object for gauge interval lables.
     */
    getIntervalLabelsFont(): FontSettings;
    /**
     * Set interval labels visibility enabled or disabled.
     * @param state True - labels are enabled, otherwise - disabled.
     * @returns     Slice itself for fluent interface.
     */
    setIntervalLabelsVisible(state: boolean): this;
    /**
     * Get interval labels visibility state.
     * @returns True - labels are enabled, otherwise - disabled.
     */
    getIntervalLabelsVisible(): boolean;
    /**
     * Set the angule interval of a slice.
     * @param start Start angle in degrees.
     * @param end   End angle in degrees.
     * @returns     Slice itself for fluent interface.
     */
    setAngleInterval(start: number, end: number): this;
    /**
     * Set start angle of the slice.
     * @param angle Min angle in degrees.
     * @returns     Slice itself for fluent interface.
     */
    setMinAngle(angle: number): this;
    /**
     * Set max angle of the slice.
     * @param angle
     * @returns     Slice itself for fluent interface.
     */
    setMaxAngle(angle: number): this;
    /**
     * Set offset margins for the slice in degrees.
     * @param left  Left margin in degrees.
     * @param right Right margin in degrees.
     */
    setMarginInDegrees(left?: number, right?: number): this;
    /**
     * Apply new fill style to slice.
     * @param value FillStyle for normal state.
     * @returns     Slice itself for a fluent interface.
     */
    setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Apply new highlight fill style to slice.
     * @param  value    FillStyle for highlighted state.
     * if omitted then a highlight color is automatically generated.
     * @returns         Slice itself for a fluent interface.
     */
    setFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get animated value of Slice.
     * When value of Slice is changed, the animated value will not update immediately, but after an animation.
     * (if animations are not disabled).
     * @return  Animated value
     */
    getAnimatedValue(): number;
}
/**
 * Datastructure that defines the dimensions of a Box Figure.
 * Used to feed segment data to Box Series.
 */
export interface BoxFigureDimensions {
    readonly start: number;
    readonly end: number;
    readonly lowerExtreme: number;
    readonly lowerQuartile: number;
    readonly median: number;
    readonly upperQuartile: number;
    readonly upperExtreme: number;
}
/**
 * Type of constructor for BoxFigures.
 * This is the type that is used to set type of Figure in BoxSeries.
 * @param layer             Rendering layer
 * @param scale             Rendering scale
 * @param remove            Callback function when figure.dispose() is called
 * @param dimensionStrategy Strategy that is used to flip Figure depending alignment of its series
 * @param start             The start of X segment
 * @param end               The end of X segment
 * @param lowerExtreme      Smallest value excluding outliers
 * @param lowerQuartile     Twenty-five percent of the data points fall below the lower quartile
 * @param median            Marks the mid-point of data. half of the segments values are greater or equal to this value.
 * @param upperQuartile     Seventy-five percent of the data points fall below the upper quartile
 * @param upperExtreme      Highest value excluding outliers
 * @hidden
 */
export declare type BoxFigureConstructor<Type extends BoxFigure> = new (layer: LayerXY, scale: Vec2<Scale>, remove: RemoveHandler<Figure>, restore: RestoreHandler<Figure>, dimensionStrategy: MultidimensionalStrategy, start: number, end: number, lowerExtreme: number, lowerQuartile: number, median: number, upperQuartile: number, upperExtreme: number) => Type;
/**
 * Abstract base class for figures of BoxSeries
 * @hidden Internal class
 */
export declare abstract class BoxFigure extends CustomizableFigure implements BoxFigureDimensions {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    readonly dimensionStrategy: MultidimensionalStrategy;
    readonly start: number;
    readonly end: number;
    readonly lowerExtreme: number;
    readonly lowerQuartile: number;
    readonly median: number;
    readonly upperQuartile: number;
    readonly upperExtreme: number;
    /**
     * Boundaries of BoxFigure.
     * Constant and computed in constructor.
     */
    readonly boundaries: Interval<Point>;
    /**
     * @param _layer            Rendering layer
     * @param scale             Rendering scale
     * @param remove            Callback function when figure.dispose() is called
     * @param dimensionStrategy Strategy that is used to flip Figure depending alignment of its series
     * @param start             The start of X segment
     * @param end               The end of X segment
     * @param lowerExtreme      Smallest value excluding outliers
     * @param lowerQuartile     Twenty-five percent of the data points fall below the lower quartile
     * @param median            Marks the mid-point of data. half of the segments values are greater or equal to this value.
     * @param upperQuartile     Seventy-five percent of the data points fall below the upper quartile
     * @param upperExtreme      Highest value excluding outliers
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, remove: RemoveHandler<Figure>, restore: RestoreHandler<Figure>, dimensionStrategy: MultidimensionalStrategy, start: number, end: number, lowerExtreme: number, lowerQuartile: number, median: number, upperQuartile: number, upperExtreme: number);
    /**
     * Return some dominant fill style of the segment
     * @returns     FillStyle object
     */
    abstract getDominantStyle(): FillStyle;
    /**
     * Get boundaries that contain figure.
     * @return  Interval<Point>
     */
    getBoundaries(): Interval<Point>;
}
/**
 * Box and whiskers StatisticFigure implementation.
 */
export declare class BoxAndWhiskers extends BoxFigure {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    readonly dimensionStrategy: MultidimensionalStrategy;
    readonly start: number;
    readonly end: number;
    readonly lowerExtreme: number;
    readonly lowerQuartile: number;
    readonly median: number;
    readonly upperQuartile: number;
    readonly upperExtreme: number;
    /**
     * @hidden
    */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, remove: (figure: Figure) => void, restore: (figure: Figure) => void, dimensionStrategy: MultidimensionalStrategy, start: number, end: number, lowerExtreme: number, lowerQuartile: number, median: number, upperQuartile: number, upperExtreme: number);
    /**
     * Set width of box body as a % of the width of its interval width.
     * @param   width   Ratio between box body width and the segments interval
     * @return          Object itself
     */
    setBodyWidth(width: number): this;
    /**
     * Get width of box body as a % of the width of its interval width.
     * @return          Ratio between box body width and the segments interval
     */
    getBodyWidth(): number;
    /**
     * Set fill style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | ~~*emptyFill*~~                        |
     *
     * @param value  FillStyle which has to be used for recoloring or mutator to modify existing one.
     * @returns      Series itself for fluent interface.
     */
    setBodyFillStyle(fillStyle: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of box body when not highlighted.
     * @return              FillStyle object
     */
    getBodyFillStyle(): FillStyle;
    /**
     * Set fill style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value FillStyle which has to be used during highlighting or mutator to modify existing one or undefined for auto.
     * @returns     Series itself for fluent interface.
     */
    setBodyFillStyleHighlight(fillStyle: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get fill style of box body when highlighted.
     * @return              FillStyle object or undefined if not assigned
     */
    getBodyFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set border style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~       Not supported, to hide border use *transparentLine*                     |
     *
     * @param value  LineStyle which has to be used for recoloring or mutator to modify existing one.
     * @returns      Series itself for fluent interface.
     */
    setBodyStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get style of box body when not highlighted.
     * @return                  LineStyle object
     */
    getBodyStrokeStyle(): LineStyle;
    /**
     * Set line style of Series border when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted border use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to modify current value.
     * @returns         Chart itself
     */
    setBodyStrokeStyleHighlight(lineStyle: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get style of box body when highlighted.
     * @return                  LineStyle object or undefined if not assigned
     */
    getBodyStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set width of box tails as a % of the width of its interval width.
     * @param   width   Ratio between box tail width and the segments interval
     * @return          Object itself
     */
    setTailWidth(width: number): this;
    /**
     * Get width of box tails as a % of the width of its interval width.
     * @return          Ratio between box tail width and the segments interval
     */
    getTailWidth(): number;
    /**
     * Set stroke style of Series whiskers and tails.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide Series use dispose() method                        |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @returns         Chart itself
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of box whiskers and tails when not highlighted.
     * @return              LineStyle object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of Series whiskers and tails when they are highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted Series use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to modify current value.
     * @returns         Chart itself
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke style of box whiskers and tails when highlighted.
     * @return              LineStyle object or undefined if not assigned
     */
    getStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set stroke style of Series median line.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide Series use dispose() method                        |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @returns         Chart itself
     */
    setMedianStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of box median line when not highlighted.
     * @return              LineStyle object
     */
    getMedianStrokeStyle(): LineStyle;
    /**
     * Set stroke style of Series median line when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted Series use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to modify current value.
     * @returns         Chart itself
     */
    setMedianStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke style of box median line when highlighted.
     * @return              LineStyle object or undefined if not assigned
     */
    getMedianStrokeStrokeHighlight(): LineStyle | undefined;
    /**
     * Return some dominant fill style of the segment
     * @returns     FillStyle object
     */
    getDominantStyle(): FillStyle;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
}
/**
 * BoxSeries class.
 * Takes in types of 'BoxFigureDimensions' and plots it using 'StatisticFigure'
 *
 * Currently always on X
 */
export declare class BoxSeries<FigureType extends BoxFigure = BoxFigure> extends SimpleFigureSeries<FigureType, BoxSeriesFormatter, BoxFigureDimensions> {
    protected readonly _figureType: BoxFigureConstructor<FigureType>;
    protected readonly dimensionStrategy: MultidimensionalStrategy;
    /**
     * @param engine            Foreground layer
     * @param chart             Parent Chart
     * @param _removeFromChart  Handler for removing reference to series from owning chart
     * @param axisX             Axis X
     * @param axisY             Axis Y
     * @param axisXAttachHandler    Attach handler for Axis X
     * @param axisYAttachHandler    Attach handler for Axis Y
     * @param _newUILayer       Factory for creating new UI layers for drawing SeriesMarkers
     * @param _figureType       Figure type
     * @param dimensionStrategy Dimension strategy for positioning BoxFigures (horizontal/vertical)
     * @hidden
     */
    constructor(engine: LayerXY, _chart: ChartXY, _removeFromChart: RemoveHandler<BoxSeries>, _restoreFromChart: RestoreHandler<BoxSeries>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _figureType: BoxFigureConstructor<FigureType>, dimensionStrategy: MultidimensionalStrategy);
    /**
     * Add new figure to the series.
     * @param   dimensions  Dimensions that figure must represent
     * @return              Created figure
     */
    add(dimensions: BoxFigureDimensions): FigureType;
}
/**
 * Type of a BoxSeriesFormatter function.
 * Defines what Cursor ResultTables show.
 * @param   tableContentBuilder     Builder that is used to build contents of ResultTable
 * @param   series                  BoxSeries
 * @param   segment                 StatisticData that is to be displayed with ResultTable
 * @return                          TableContentBuilder that was supplied
 */
export declare type BoxSeriesFormatter = <T extends TableContentBuilder>(tableContentBuilder: T, series: BoxSeries, segment: BoxFigureDimensions) => T;
/**
 * Type of constructor for OHLCFigures.
 * @param layer     Rendering layer
 * @param scale     Rendering scale
 * @param positive  Does figure represent positive or negative segments
 * @param widthInPixels     Figures width in pixels
 * @hidden
 */
export declare type OHLCFigureConstructor<Type extends OHLCFigure> = new (layer: LayerXY, scale: Vec2<Scale>, remove: (figure: Figure) => void, restore: (figure: Figure) => void, positive: boolean) => Type;
/**
 * Interface for data values of an OHLC segment.
 */
export interface OHLCSegment {
    /**
     * Get Position of OHLC segment.
     * @return  Position
     */
    getPosition(): number;
    /**
     * Get Open value of OHLC segment.
     * @return  Open value
     */
    getOpen(): number;
    /**
     * Get High value of OHLC segment.
     * @return  High value
     */
    getHigh(): number;
    /**
     * Get Low value of OHLC segment.
     * @return  Low value
     */
    getLow(): number;
    /**
     * Get Close value of OHLC segment.
     * @return  Close value
     */
    getClose(): number;
}
/**
 * Abstract base class for OHLCFigures.
 * OHLCFigures are designed to be recycleable, which means they
 * must be able to be resized at any moment. Because OHLC series can have different classes for
 * positive/negative figures, this state is not changeable! So any figure that was created as 'positive',
 * can not be recycled to be 'negative'!
 */
export declare abstract class OHLCFigure extends Figure implements OHLCSegment {
    protected readonly _layer: LayerXY;
    readonly scale: Vec2<Scale>;
    readonly positive: boolean;
    /**
     * @param _layer             Rendering layer
     * @param scale             Rendering scale
     * @param positive          Does figure represent positive or negative segments
     * @hidden
     */
    constructor(_layer: LayerXY, scale: Vec2<Scale>, remove: (figure: Figure) => void, restore: (figure: Figure) => void, positive: boolean);
    /**
     * Set values of figure.
     *
     * This is an internal function, it should not be used from applications.
     * @param   position    Position
     * @param   open        Open value
     * @param   high        High value
     * @param   low         Low value
     * @param   close       Close value
     * @param   dataIndex   Index of data
     * @return              Object itself
     */
    setValues(position: number, open: number, high: number, low: number, close: number, dataIndices: number | number[]): this;
    /**
     * Set width of figure.
     *
     * This is an internal function, it should not be used from applications.
     * For customizing width of Figure, see OHLCSeries.setFigureWidth
     * @param   width   Width of figure on its X scale
     * @return          Object itself
     */
    setWidth(width: number): this;
    /**
     * Get Middle X position
     * @return  Middle X position
     */
    getPosition(): number;
    /**
     * Get Open value
     * @return  Open value
     */
    getOpen(): number;
    /**
     * Get High value
     * @return  High value
     */
    getHigh(): number;
    /**
     * Get Low value
     * @return  Low value
     */
    getLow(): number;
    /**
     * Get Close value
     * @return  Close value
     */
    getClose(): number;
    /**
     * Get Width of figure on x axis
     * @return  Width on x axis
     */
    getWidth(): number;
    /**
     * Get indices of data that figure represents.
     * @return  Either index array for multiple samples or single index
     */
    getDataIndices(): number | number[];
}
/**
 * Candlestick *OHLCFigure*.
 */
export declare class OHLCCandleStick extends OHLCFigure {
    /**
     * Set stroke style of candles lines.
     * @param   value      LineStyle object or mutator to modify existing one
     * @return             Object itself
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stoke style of candles.
     * @return              LineStyle object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of candles when highlighted.
     * @param   value       FillStyle object or mutator to modify existing one or undefined for automatic computation
     * @return              Object itself
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke style of candles when highlighted.
     * @return              FillStyle object or undefined if unassigned
     */
    getStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Set fill style of candles body.
     * @param   value       FillStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setBodyFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Get fill style of candles body.
     * @return              FillStyle object
     */
    getBodyFillStyle(): FillStyle;
    /**
     * Set fill style of candles body when highlighted.
     * @param   fillStyle   FillStyle object or mutator to modify existing one or undefined for automatic assignment
     * @return              Object itself
     */
    setBodyFillStyleHighlight(fillStyle: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get fill style of candles body when highlighted.
     * @return              FillStyle object if unassigned
     */
    getBodyFillStyleHighlight(): FillStyle | undefined;
    /**
     * Set stroke style of candles body.
     * @param   value       LineStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setBodyStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of candles body.
     * @return              LineStyle object
     */
    getBodyStrokeStyle(): LineStyle;
    /**
     * Set style of candles body when highlighted.
     * @param   value       LineStyle object or mutator to modify existing one or undefined for automatic assignment
     * @return              Object itself
     */
    setBodyStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get style of candles body when highlighted.
     * @return              LineStyle object or undefined if unassigned
     */
    getBodyStrokeStyleHighlight(): LineStyle | undefined;
    /**
     * Return some dominant fill style of the segment
     * @returns     FillStyle object
     */
    getDominantStyle(): FillStyle;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
}
/**
 * Bar *OHLCFigure*.
 */
export declare class OHLCBar extends OHLCFigure {
    /**
     * Set stroke style of bar lines.
     * @param   value       LineStyle object or mutator to modify existing one
     * @return              Object itself
     */
    setStrokeStyle(value: LineStyle | ImmutableMutator<LineStyle>): this;
    /**
     * Get stroke style of bar lines.
     * @return              LineStyle object
     */
    getStrokeStyle(): LineStyle;
    /**
     * Set stroke style of bar lines when highlighted.
     * @param   value       LineStyle object or mutator to modify existing one or undefined for default
     * @return              Object itself
     */
    setStrokeStyleHighlight(value: LineStyle | ImmutableMutator<LineStyle> | undefined): this;
    /**
     * Get stroke fill style of bar lines when highlighted.
     * @return              LineStyle object or undefined if unassigned
     */
    getStrokeHighlight(): LineStyle | undefined;
    /**
     * Return some dominant fill style of the segment
     * @returns     FillStyle object
     */
    getDominantStyle(): FillStyle;
    /**
     * Set highlighted state of the Object
     * @param isHighlighted Highlight state of the object
     * @returns             Object itself for fluent interface
     */
    setHighlighted(isHighlighted: boolean): this;
}
/**
 * Collection of *OHLCFigure* options.
 *
 * Used for selecting different figure designs for *OHLCSeries*. eq.
 * - Candlestick Chart can be created using *OHLCFigures.Candlestick*
 * - OHLC Chart can be created using *OHLCFigures.Bar*
 *
 * Example usage:
 *
 * | Desired result                         | Usage                                                                         |
 * | :------------------------------------- | :---------------------------------------------------------------------------- |
 * | Specify *OHLCFigure* of *OHLCSeries*   | *ChartXY*.addOHLCSeries(undefined, undefined, **OHLCFigures.Candlestick**)    |
 */
export declare const OHLCFigures: {
    /**
     * Candlestick *OHLCFigure*.
     */
    Candlestick: typeof OHLCCandleStick;
    /**
     * Bar *OHLCFigure*.
     */
    Bar: typeof OHLCBar;
};
/**
 * StockSeries implementation using FigureSeries.
 * Actual types used are in file 'stockInterfaces.ts'
 */
/**
 * Ordered tuple that contains values for:
 * - X
 * - Open
 * - High
 * - Low
 * - Close
 */
export declare type XOHLC = [number, number, number, number, number];
/**
 * Type of styler function for OHLC figures
 */
export declare type OHLCFigureStyler<T extends OHLCFigure> = (figure: T) => void;
/**
 * Type definition for OHLC-series constructor.
 * @param engine            Drawing Engine
 * @param _chart            Parent Chart
 * @param _removeFromChart  Handler for removing reference to series from owning chart
 * @param axisX             Axis X
 * @param axisY             Axis Y
 * @param _newUILayer       Factory for creating new UI layers for drawing SeriesMarkers
 * @param _positiveFigure   OHLCFigure constructor for positive figure
 * @param _negativeFigure   OHLCFigure constructor for negative figure
 * @hidden
 */
export declare type OHLCSeriesConstructor<PositiveFigure extends OHLCFigure, NegativeFigure extends OHLCFigure, OHLCSeriesType extends OHLCSeriesTypes<PositiveFigure, NegativeFigure>> = new (engine: LayerXY, _chart: ChartXY, _removeFromChart: RemoveHandler<OHLCSeries<OHLCFigure, OHLCFigure>>, _restoreFromChart: RestoreHandler<OHLCSeries<OHLCFigure, OHLCFigure>>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _positiveFigure: OHLCFigureConstructor<PositiveFigure>, _negativeFigure: OHLCFigureConstructor<NegativeFigure>) => OHLCSeriesType;
/**
 * Abstract base class for series that display OHLC-segments using OHLCFigures.
 * Currently only supports progressive X timeline!
 * @hidden Internal class
 */
export declare abstract class OHLCSeries<PositiveFigure extends OHLCFigure, NegativeFigure extends OHLCFigure> extends FigureSeries<PositiveFigure | NegativeFigure, OHLCCursorPoint> {
    readonly axisX: Axis;
    readonly axisY: Axis;
    protected _positiveFigure: OHLCFigureConstructor<PositiveFigure>;
    protected _negativeFigure: OHLCFigureConstructor<NegativeFigure>;
    /**
     * @param engine                Drawing Engine
     * @param _chart                Parent Chart
     * @param _removeFromChart      Handler for removing reference to series from owning chart
     * @param axisX                 Axis X
     * @param axisY                 Axis Y
     * @param axisXAttachHandler    Attach handler for Axis X
     * @param axisYAttachHandler    Attach handler for Axis Y
     * @param _newUILayer           Factory for creating new UI layers for drawing SeriesMarkers
     * @param _positiveFigure       OHLCFigure constructor for positive figure
     * @param _negativeFigure       OHLCFigure constructor for negative figure
     * @hidden
     */
    constructor(engine: LayerXY, _chart: ChartXY, _removeFromChart: RemoveHandler<OHLCSeries<OHLCFigure, OHLCFigure>>, _restoreFromChart: RestoreHandler<OHLCSeries<OHLCFigure, OHLCFigure>>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _positiveFigure: OHLCFigureConstructor<PositiveFigure>, _negativeFigure: OHLCFigureConstructor<NegativeFigure>);
    /**
     * Set common style for both positive and negative figures.
     * NOTE: Because the function is applied for each figure added, it is not advised to create any objects inside the function.
     * Instead they should be previously cached and later referred to.
     *
     * Example usage:
     *
     * | Desired result | Argument          | Explanation                                                                               |
     * | :------------- | :---------------- | :---------------------------------------------------------------------------------------- |
     * | Explicit style | (figure) => ...   | The type of figure can be equal to type parameter PositiveFigure or NegativeFigure        |
     * @param   styler  Styler function that is applied to all existing and newly added segments
     * @return          Object itself
     */
    setStyle(style: OHLCFigureStyler<PositiveFigure | NegativeFigure>): this;
    /**
     * Set style of positive figures.
     * Positive style is applied after common style.
     * NOTE: Because the function is applied for each figure added, it is not advised to create any objects inside the function.
     * Instead they should be previously cached and later referred to.
     *
     * Example usage:
     *
     * | Desired result | Argument          | Explanation                                                                               |
     * | :------------- | :---------------- | :---------------------------------------------------------------------------------------- |
     * | Explicit style | (figure) => ...   | The type of 'figure' is equal to type parameter: PositiveFigure                           |
     * @param   styler  Styler function that is applied to all existing and newly added segments
     * @return          Object itself
     */
    setPositiveStyle(style: OHLCFigureStyler<PositiveFigure>): this;
    /**
     * Set style of negative figures.
     * Negative style is applied after common style.
     * NOTE: Because the function is applied for each figure added, it is not advised to create any objects inside the function.
     *
     * Example usage:
     *
     * | Desired result | Argument          | Explanation                                                                               |
     * | :------------- | :---------------- | :---------------------------------------------------------------------------------------- |
     * | Explicit style | (figure) => ...   | The type of 'figure' is equal to type parameter: NegativeFigure                           |
     * @param   styler  Styler function that is applied to all existing and newly added segments
     * @return          Object itself
     */
    setNegativeStyle(style: OHLCFigureStyler<NegativeFigure>): this;
    /**
     * Set width of figures in pixels.
     * @param   width   Width in pixels
     * @return          Object itself
     */
    setFigureWidth(width: pixel): this;
    /**
     * Get width of figures in pixels.
     */
    getFigureWidth(): pixel;
    /**
     * Set maximum amount of OHLC data-points
     * @param maxPointsCount    Maximum amount of OHLC data-points that should be kept around.
     *                          If undefined or 0 is passed data-cleaning will be disabled.
     * @returns                 Object itself
     */
    setMaxPointsCount(maxPointsCount: number | undefined): this;
    /**
     * Solves the nearest datapoint to a given coordinate on screen.
     * @param   location    Location on screen
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromScreen(location: Point): undefined | OHLCCursorPoint;
    /**
     * Solves the nearest datapoint to a given coordinate on a screen from a specific segment.
     * @param   location    Location on screen
     * @param   segment     Segment to solve from
     * @return              Undefined or data-structure for positioning of cursors
     */
    solveNearestFromSegment(location: Point, segment: OHLCFigure): undefined | OHLCCursorPoint;
    /**
     * Method for customizing contents of ResultTables when pointing at this Series.
     * @param   formatter   Function which builds ResultTable content.
     *                      See definition of OHLCSeriesFormatter for supplied formatting information.
     * @return              Object itself
     */
    setResultTableFormatter(formatter: OHLCSeriesFormatter): this;
    /**
     * Get ResultTable Formatter.
     * @return  Function which builds ResultTable content for OHLCSeries.
     */
    getResultTableFormatter(): OHLCSeriesFormatter;
    /**
     * Clear all data from the series
     * @returns         Series itself for fluent interface
     */
    clear(): this;
    /**
     * @return Max X value of the series
     */
    getXMax(): number;
    /**
     * @return Min X value of the series
     */
    getXMin(): number;
    /**
     * @return Max Y value of the series
     */
    getYMax(): number;
    /**
     * @return Min Y value of the series
     */
    getYMin(): number;
}
/**
 * OHLCSeries class.
 * Takes data in format of OHLC segment interface and renders it using generic StockFigures.
 * Currently only supports progressive X timeline!
 */
export declare class OHLCSeriesTraditional<PositiveFigure extends OHLCFigure, NegativeFigure extends OHLCFigure> extends OHLCSeries<PositiveFigure, NegativeFigure> {
    /**
     * Add OHLC segments to series.
     * NOTE: Added segments must always have progressive X values!
     * @param   data    Tuple of X+OHLC values or array of such tuples
     * @return          Object itself
     */
    add(data: XOHLC | XOHLC[]): this;
}
/**
 * Type of OHLCSeries that automatically packages progressive (X) Vec2 data.
 */
export declare class OHLCSeriesWithAutomaticPacking<PositiveFigure extends OHLCFigure, NegativeFigure extends OHLCFigure> extends OHLCSeries<PositiveFigure, NegativeFigure> {
    /**
     * Add point or array of points
     * @param    data    Point or array of points
     * @returns          Series itself for fluent interface
     */
    add(data: Point | Point[]): this;
    /**
     * Add point to the Series.
     * @param   p       New point
     * @returns         Series itself for fluent interface
     */
    addPoint(p: Point): this;
    /**
     * Add points to the Stock series.
     * @param   points   Array of new points
     * @returns          Series itself for fluent interface
     */
    addPoints(points: Point[]): this;
    /**
     * Set resolution of Stock segment packing.
     * Smaller resolution will let user zoom to greater detail.
     * If no resolution has been defined, series will use pixel width of figures as packing resolution.
     * @param   resolution  Axis value interval for resolution of a single Stock segment
     *                      or undefined to be automatically calculated based on pixelSize.
     * @return              Object itself
     * @sideEffect          Series will consume more memory if resolution value is lowered.
     */
    setPackingResolution(resolution?: number): this;
}
/**
 * Available OHLC Series types
 */
export declare type OHLCSeriesTypes<PositiveFigure extends OHLCFigure, NegativeFigure extends OHLCFigure> = OHLCSeriesTraditional<PositiveFigure, NegativeFigure> | OHLCSeriesWithAutomaticPacking<PositiveFigure, NegativeFigure>;
/**
 * Collection of *OHLCSeries* types.
 *
 * By default, *OHLCSeries* will be *OHLCSeriesTraditional*, but different types can be created with these options.
 * Note, that based on the selection the *Series* can have different *API*!
 *
 * Example usage:
 *
 * | Desired result                             | Usage                                                                                                     |
 * | :------------------------------------------| :-------------------------------------------------------------------------------------------------------- |
 * | Create *OHLCSeries* with automatic packing | *ChartXY*.addOHLCSeries(undefined, undefined, undefined, undefined, **OHLCSeriesTypes.AutomaticPacking**) |
 */
export declare const OHLCSeriesTypes: {
    /**
     * *OHLCSeries* type that takes data traditionally in XOHLC-tuples.
     */
    Normal: typeof OHLCSeriesTraditional;
    /**
     * *OHLCSeries* type that takes data as X-progressive Points.
     * The *Series* automatically packs these into OHLC-segments.
     *
     * **If this option is selected, the "add()"-method of the created *Series* will only accept *Points*, rather than *XOHLC*-values**.
     */
    AutomaticPacking: typeof OHLCSeriesWithAutomaticPacking;
};
/**
 * Interface for CursorPoints that point to an OHLCSegment.
 * Used to pack information about pointed segment to users.
 */
export interface OHLCCursorPoint extends CursorPoint<OHLCSeries<OHLCFigure, OHLCFigure>> {
    /**
     * Interface that contains information about the pointed OHLCSegment.
     */
    ohlcSegment: OHLCSegment;
}
/**
 * Interface for a function which builds ResultTable content when pointing at an OHLCSeries.
 * @param   tableContentBuilder     Builder that is used to build contents of ResultTable.
 *                                  Use addRow() method for adding content.
 * @param   series                  OHLCSeries
 * @param   ohlcSegment             OHLCSegment that is pointed. Has methods for reading its Open, High, Low, Close and Position values.
 * @return                          TableContentBuilder that was supplied
 */
export declare type OHLCSeriesFormatter = <T extends TableContentBuilder>(tableContentBuilder: T, series: OHLCSeries<OHLCFigure, OHLCFigure>, ohlcSegment: OHLCSegment) => T;
/**
 * The abstract class implements the most part of general logic for area series.
 * All the derivative series implements their own logic for processing incoming data.
 * @hidden Internal class
 */
export declare abstract class AreaSeries extends RangeSeries {
    protected readonly _baseline: number;
    /**
     * @param engine                Rendering layer for the entire series.
     * @param _chart                Cartesian chart surface.
     * @param _removeFromChart      Injected method to remove the created series from Chart that owns it.
     * @param axisX                 X-axis to which the series has to be attached.
     * @param axisY                 Y-axis to which the series has to be attached.
     * @param axisXAttachHandler    Attach handler for Axis X
     * @param axisYAttachHandler    Attach handler for Axis Y
     * @param _newUILayer           Factory for creating new UI layers for drawing SeriesMarkers
     * @param _baseline             The limit at which series starts.
     * @hidden
     */
    constructor(engine: LayerXY, _chart: ChartXY, _removeFromChart: RemoveHandler<AreaSeries>, _restoreFromChart: RestoreHandler<AreaSeries>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _baseline?: number);
    /**
     * Add point or array of points to the dataset.
     * @param points   Single new point or an array of new points.
     * @returns        Series itself for fluent interface.
     */
    add(data: Point | Point[]): this;
}
/**
 * Generic constructor for different types of Area series.
 *
 * @param engine                Rendering layer for the entire series.
 * @param _chart                Cartesian chart surface.
 * @param _removeFromChart      Injected method to remove the created series from Chart that owns it.
 * @param axisX                 X-axis to which the series has to be attached.
 * @param axisY                 Y-axis to which the series has to be attached.
 * @param axisXAttachHandler    Attach handler for Axis X
 * @param axisYAttachHandler    Attach handler for Axis Y
 * @param _newUILayer           Factory for creating new UI layers for drawing SeriesMarkers
 * @param _baseline             The limit at which series starts.
 * @returns                     Object with required type.
 * @hidden
 */
export declare type AreaSeriesConstructor<T extends AreaSeries> = new (engine: LayerXY, _chart: ChartXY, _removeFromChart: RemoveHandler<AreaSeries>, _restoreFromChart: RestoreHandler<AreaSeries>, axisX: Axis, axisY: Axis, axisXAttachHandler: AxisAttachHandler, axisYAttachHandler: AxisAttachHandler, _newUILayer: () => LayerXY, _baseline?: number) => T;
/**
 * Implementation of *SeriesXY* for visualizing a collection of progressive *Points* by
 * filling the area between the points *Y*-values and a static *baseline* value.
 *
 * This type of *AreaSeries* shows data on both sides of the *baseline*, and it has individual styles for each side:
 * *positive* and *negative*. Each side is also composed of the areas *fill* and *border*.
 *
 * *AreaSeriesBipolar* are created with *ChartXY*.**addAreaSeries()** and selecting *AreaSeriesTypes.Bipolar*.
 */
export declare class AreaSeriesBipolar extends AreaSeries {
    /**
     * Set positive area style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns     Series itself for fluent interface.
     */
    setPositiveFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set positive area style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    setPositiveFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Set negative area style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns     Series itself for fluent interface.
     */
    setNegativeFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set negative area style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    setNegativeFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Set positive stroke style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~       Not supported, to hide stroke use *transparentLine*                 |
     *
     * @param value  Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @returns      Series itself for fluent interface.
     */
    setPositiveStrokeStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Set positive stroke style of Series when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted stroke use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value or
     *                  undefined for automatic value based on normal style.
     * @returns         Chart itself
     */
    setPositiveStrokeStyleHighlight(value: SolidLine | ImmutableMutator<SolidLine> | undefined): this;
    /**
     * Set negative stroke style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~       Not supported, to hide stroke use *transparentLine*                 |
     *
     * @param value  Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @returns      Series itself for fluent interface.
     */
    setNegativeStrokeStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Set negative stroke style of Series when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted stroke use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value or
     *                  undefined for automatic value based on normal style.
     * @returns         Chart itself
     */
    setNegativeStrokeStyleHighlight(value: SolidLine | ImmutableMutator<SolidLine> | undefined): this;
    /**
     * Get a current fill style used for the coloring of the positive area in the series.
     * @returns      Current fill style used for the coloring of the positive area in the series.
     */
    getPositiveFillStyle(): FillStyle;
    /**
     * Get a current highlight fill style used for the coloring of the positive area during series highlighting.
     * @returns     Current highlight fill style used for the coloring of the positive area during series highlighting.
     */
    getPositiveFillStyleHighlight(): FillStyle;
    /**
     * Get a current fill style used for the coloring of the negative area in the series.
     * @returns      Current fill style used for the coloring of the negative area in the series.
     */
    getNegativeFillStyle(): FillStyle;
    /**
     * Get a current highlight fill style used for the coloring of the negative area during series highlighting.
     * @returns     Current highlight fill style used for the coloring of the negative area during series highlighting.
     */
    getNegativeFillStyleHighlight(): FillStyle;
    /**
     * Get a current line style of a stroke used for the coloring of the positive stroke in the series.
     * @returns     Current line style of a stroke used for the coloring of the positive stroke.
     */
    getPositiveStrokeStyle(): LineStyle;
    /**
     * Get a current line style of a stroke used for the coloring of the positive border during highlighting.
     * @returns     Current line style of a border used for the coloring of the positive border during highlighting.
     */
    getPositiveStrokeStyleHighlight(): LineStyle;
    /**
     * Get a current line style of a border used for the coloring of the negative border in the series.
     * @returns     Current line style of a border used for the coloring of the negative border.
     */
    getNegativeStrokeStyle(): LineStyle;
    /**
     * Get a current line style of a border used for the coloring of of the negative border during highlighting.
     * @returns     Current line style of a border used for the coloring of the negative border during highlighting.
     */
    getNegativeStrokeStyleHighlight(): LineStyle;
}
/**
 * The abstact class implements the most part of general logic for specific area series types.
 * These series use only one fill style and only one border.
 * All the derivative series implements their own logic for processing incoming data.
 * @hidden Internal class
 */
export declare abstract class AreaSeriesMonopolar extends AreaSeries {
    /**
     * Attach object to an legendBox entry
     * @param entry             Object which has to be attached
     * @param disposeOnClick    Flag that indicates whether the Attachable should be disposed/restored,
     *                          when its respective Entry is clicked.
     * @return                  Series itself for fluent interface
     */
    attach(entry: LegendBoxEntry, disposeOnClick?: boolean): this;
    /**
     * Set fill style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | ~~*emptyFill*~~                        |
     *
     * @param value  Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns      Series itself for fluent interface.
     */
    abstract setFillStyle(fill: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set fill style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    abstract setFillStyleHighlight(fill: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Set stroke style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified LineStyle    | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~       Not supported, to hide border use *transparentLine*                     |
     *
     * @param value  Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value.
     * @returns      Series itself for fluent interface.
     */
    setStrokeStyle(value: SolidLine | ImmutableMutator<SolidLine>): this;
    /**
     * Set stroke style of Series border when it is highlighted.
     * Highlighting is activated by placing mouse on top / touching Series (if mouse-interactions are not disabled),
     * or by using setHighlighted() method.
     *
     * Example usage:
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Solid line             | new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) })    |
     * | Changed thickness      | (solidLine) => solidLine.setThickness(5)                                                  |
     * | Hidden                 | ~~*emptyLine*~~ Not supported, to hide highlighted border use *transparentLine*           |
     * | Automatic              | undefined                                                                                 |
     *
     * @param   value   Either a SolidLine object or a function, which will be used to create a new SolidLine based on current value or
     *                  undefined for automatic value based on normal style.
     * @returns         Chart itself
     */
    setStrokeStyleHighlight(value: SolidLine | ImmutableMutator<SolidLine> | undefined): this;
    /**
     * Get a current fill style used for the coloring of an area in the series.
     * @returns      Current fill style used for the coloring of an area in the series.
     */
    abstract getFillStyle(): FillStyle;
    /**
     * Get a current highlight fill style used for the coloring of an area during series highlighting.
     * @returns     Current highlight fill style used for the coloring of an area during series highlighting.
     */
    abstract getFillStyleHighlight(): FillStyle;
    /**
     * Get a current style of a stroke used for the coloring of a series border.
     * @returns     Current style of a stroke used for the coloring of a border.
     */
    getStrokeStyle(): LineStyle;
    /**
     * Get a current style of a stroke used for the coloring of a series border by series.
     * @returns     Current style of a stroke used for the coloring of a series border by series.
     */
    getStrokeStyleHighlight(): LineStyle;
}
/**
 * Implementation of *SeriesXY* for visualizing a collection of progressive *Points* by
 * filling the area between the points *Y*-values and a static *baseline* value.
 * This type of *AreaSeries* only shows data that is **below the baseline**.
 *
 * Composed of the areas *fill* and *border*.
 *
 * *AreaSeriesNegative* are created with *ChartXY*.**addAreaSeries()** and selecting *AreaSeriesTypes.Negative*.
 */
export declare class AreaSeriesNegative extends AreaSeriesMonopolar {
    /**
     * Set fill style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param value  Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns      Series itself for fluent interface.
     */
    setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set fill style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    setFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get a current fill style used for the coloring of an area in the series.
     * @returns      Current fill style used for the coloring of an area in the series.
     */
    getFillStyle(): FillStyle;
    /**
     * Get a current highlight fill style used for the coloring of an area during series highlighting.
     * @returns     Current highlight fill style used for the coloring of an area during series highlighting.
     */
    getFillStyleHighlight(): FillStyle;
}
/**
 * Implementation of *SeriesXY* for visualizing a collection of progressive *Points* by
 * filling the area between the points *Y*-values and a static *baseline* value.
 * This type of *AreaSeries* only shows data that is **above the baseline**.
 *
 * Composed of the areas *fill* and *border*.
 *
 * *AreaSeriesPositive* are created with *ChartXY*.**addAreaSeries()** and selecting *AreaSeriesTypes.Positive*.
 */
export declare class AreaSeriesPositive extends AreaSeriesMonopolar {
    /**
     * Set fill style of Series.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     *
     * @param value  Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value.
     * @returns      Series itself for fluent interface.
     */
    setFillStyle(value: FillStyle | ImmutableMutator<FillStyle>): this;
    /**
     * Set fill style of Series when it is highlighted.
     *
     * | Desired result         | Argument                                                                                  |
     * | :--------------------- | :---------------------------------------------------------------------------------------- |
     * | Specified FillStyle    | new SolidFill({ color: ColorHEX('#F00') })                                                |
     * | Changed color          | (solidFill) => solidFill.setColor( ColorRGBA( 0, 0, 0, 0 ) )                              |
     * | Hidden                 | *emptyFill*                                                                               |
     * | Automatic              | undefined                                                                                 |
     *
     * @param value Either a FillStyle object or a function, which will be used to create a new FillStyle based on current value or
     *              undefined for automatic value based on normal style.
     * @returns     Series itself for fluent interface.
     */
    setFillStyleHighlight(value: FillStyle | ImmutableMutator<FillStyle> | undefined): this;
    /**
     * Get a current fill style used for the coloring of an area in the series.
     * @returns      Current fill style used for the coloring of an area in the series.
     */
    getFillStyle(): FillStyle;
    /**
     * Get a current highlight fill style used for the coloring of an area during series highlighting.
     * @returns     Current highlight fill style used for the coloring of an area during series highlighting.
     */
    getFillStyleHighlight(): FillStyle;
}
/**
 * Available Area Series types
 */
export declare type AreaSeriesTypes = typeof AreaSeriesTypes[keyof typeof AreaSeriesTypes];
/**
 * Collection of *AreaSeries* implementations.
 *
 * Used when creating an *AreaSeries* with *ChartXY*.**addAreaSeries()**.
 * Selected option tells what the returned *Series* type will be - different *Series* types can have different *API*s !
 *
 * - Select AreaSeriesTypes.Positive to show only area above the baseline.
 * - Select AreaSeriesTypes.Negative to show only area below the baseline.
 * - Select AreaSeriesTypes.Both to show both areas from both sides of the baseline.
 */
export declare const AreaSeriesTypes: {
    /**
     * Type of *AreaSeries* that only shows data that is **above the baseline**.
     */
    Positive: typeof AreaSeriesPositive;
    /**
     * Type of *AreaSeries* that only shows data that is **below the baseline**.
     */
    Negative: typeof AreaSeriesNegative;
    /**
     * Type of *AreaSeries* that shows data on both sides of baseline.
     *
     * Has individual styles for positive/negative areas.
     */
    Bipolar: typeof AreaSeriesBipolar;
};
