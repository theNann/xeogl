"use strict";

/**
 A **Clip** is an arbitrarily-aligned World-space clip plane.

 <ul>

 <li>These are grouped within {{#crossLink "Clips"}}Clips{{/crossLink}} components, which are attached to
 {{#crossLink "GameObject"}}GameObjects{{/crossLink}}. See the {{#crossLink "Clips"}}Clips{{/crossLink}} documentation
 for a usage example.</li>

 <li>A Clip is specified in World-space, as being perpendicular to a vector {{#crossLink "Clip/dir:property"}}{{/crossLink}}
 that emanates from the origin, offset at a distance {{#crossLink "Clip/dist:property"}}{{/crossLink}} along that vector. </li>

 <li>You can move a Clip back and forth along its vector by varying {{#crossLink "Clip/dist:property"}}{{/crossLink}}.</li>

 <li>Likewise, you can rotate a Clip about the origin by rotating {{#crossLink "Clip/dir:property"}}{{/crossLink}}.</li>

 <li>A Clip is has a {{#crossLink "Clip/mode:property"}}{{/crossLink}},  which indicates whether it is disabled
 ("disabled"), discarding fragments that fall on the origin-side of the plane ("inside"), or clipping fragments that
 fall on the other side of the plane from the origin ("outside").</li>

 <li>You can update the {{#crossLink "Clip/mode:property"}}{{/crossLink}} of a Clip to activate or deactivate it, or to
 switch which side it discards fragments from.</li>

 </ul>

 <img src="http://www.gliffy.com/go/publish/image/7096963/L.png"></img>

 @class Clip
 @module XEO
 @constructor
 @param [scene] {Scene} Parent {{#crossLink "Scene"}}Scene{{/crossLink}} - creates this Clip in the
 default {{#crossLink "Scene"}}Scene{{/crossLink}} when omitted.
 @param [cfg] {*} Clip configuration
 @param [cfg.id] {String} Optional ID, unique among all components in the parent {{#crossLink "Scene"}}Scene{{/crossLink}}, generated automatically when omitted.
 You only need to supply an ID if you need to be able to find the Clip by ID within the {{#crossLink "Scene"}}Scene{{/crossLink}}.
 @param [cfg.meta] {String:Object} Optional map of user-defined metadata to attach to this Clip.
 @param [cfg.mode="disabled"] {String} Clipping mode - "disabled" to clip nothing, "inside" to reject points inside the plane, "outside" to reject points outside the plane.
 @param [dir= [1, 0, 0]] {Array of Number} The direction of the clipping plane from the World-space origin.
 @param [dist=1.0] {Number} Distance to the clipping plane along the direction vector.

 @extends Component
 */
XEO.Clip = XEO.Component.extend({

    className: "XEO.Clip",

    type: "clip",

    _init: function (cfg) {
        this.mode = cfg.mode;
        this.dir = cfg.dir;
        this.dist = cfg.dist;
    },

    /**
     The current mode of this Clip.

     Possible states are:

     <ul>
     <li>"disabled" - inactive</li>
     <li>"inside" - clipping fragments that fall within the half-space on the origin-side of the Clip plane</li>
     <li>"outside" - clipping fragments that fall on the other side of the Clip plane from the origin</li>
     </ul>

     Fires a {{#crossLink "Clip/mode:event"}}{{/crossLink}} event on change.

     @property mode
     @default "disabled"
     @type String
     */
    set mode(value) {
        value = value || "disabled";
        this._core.mode = value;
        this._renderer.imageDirty = true;

        /**
          Fired whenever this Clip's {{#crossLink "Clip/mode:property"}}{{/crossLink}} property changes.

          @event mode
          @param value {String} The property's new value
         */
        this.fire("mode", value);
    },

    get mode() {
        return this._core.mode;
    },

    /**
     A vector emanating from the World-space origin that indicates the orientation of this Clip plane.

     The Clip plane will be oriented perpendicular to this vector.

     Fires a {{#crossLink "Clip/dir:event"}}{{/crossLink}} event on change.

     @property dir
     @default [1.0, 1.0, 1.0]
     @type Array(Number)
     */
    set dir(value) {
        value = value || [1, 0, 0];
        this._core.dir = value;
        this._renderer.imageDirty = true;

        /**
          Fired whenever this Clip's {{#crossLink "Clip/dir:property"}}{{/crossLink}} property changes.

          @event dir
          @param  value  {Array(Number)} The property's new value
         */
        this.fire("dir", value);
    },

    get dir() {
        return this._core.dir;
    },

    /**
     The position of this Clip along the vector indicated by {{#crossLink "Clip/dir:property"}}{{/crossLink}}.

     This is the distance of the Clip plane from the World-space origin.

     Fires a {{#crossLink "Clip/dist:event"}}{{/crossLink}} event on change.

     @property dist
     @default 1.0
     @type Number
     */
    set dist(value) {
        value = value != undefined ? value : 1.0;
        this._core.dist = value;
        this._renderer.imageDirty = true;

        /**
          Fired whenever this Clip's {{#crossLink "Clip/dist:property"}}{{/crossLink}} property changes.

          @event dist
          @param  value Number The property's new value
         */
        this.fire("dist", value);
    },

    get dist() {
        return this._core.dist;
    },

    _getJSON: function () {
        return {
            mode: this.mode,
            dir: this.dir,
            dist: this.dist
        };
    }
});

