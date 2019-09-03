// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/on dojo/Deferred dojo/query ./utils dijit/form/Button dijit/_TemplatedMixin dijit/_WidgetBase esri/undoManager esri/OperationBase esri/graphic esri/tasks/query esri/tasks/QueryTask esri/tasks/RelationshipQuery esri/layers/FeatureLayer esri/dijit/AttributeInspector esri/dijit/Popup esri/dijit/PopupTemplate jimu/portalUrlUtils jimu/SelectionManager jimu/ConfigManager jimu/dijit/DropdownMenu jimu/dijit/LoadingIndicator jimu/LayerInfos/LayerInfos".split(" "),
function(q,e,m,g,n,l,r,p,z,A,B,C,D,v,u,w,M,E,F,G,H,x,y,I,J,K,L){var h=q([B,A],{baseClass:"related-records-editor",templateString:"\x3cdiv\x3e\x3cdiv class\x3d'operation-box' data-dojo-attach-point\x3d'operationBox'\x3e\x3cdiv class\x3d'previos-btn feature-action' data-dojo-attach-point\x3d'previouBtn'data-dojo-attach-event\x3d'click:_onPreviouBtnClick'\x3e\x3c/div\x3e\x3cdiv class\x3d'operation-title' data-dojo-attach-point\x3d'operationTitle'\x3e\x3c/div\x3e\x3cdiv class\x3d'add-new-btn' data-dojo-attach-point\x3d'addNewBtn'\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'content-box' data-dojo-attach-point\x3d'contentBox'\x3e\x3c/div\x3e\x3c/div\x3e",
editorATI:null,originalFeature:null,originalLayer:null,originalJimuLayerInfo:null,layerInfosObj:null,undoManager:null,refDomNode:null,_temporaryData:null,tableInfosParam:null,postCreate:function(){this._init();g.place(this.domNode,this.refDomNode,"after");window.isRTL?g.addClass(this.previouBtn,"icon-arrow-forward"):g.addClass(this.previouBtn,"icon-arrow-back");this.loading=(new K({hidden:!0})).placeAt(this.domNode);this._clearPage();this.showFirstPage({feature:this.originalFeature,oriJimuLayerInfo:this.originalJimuLayerInfo})},
_init:function(){this.refDomNode=this.editorATI.domNode;this.originalLayer=this.originalFeature.getLayer();this.layerInfosObj=L.getInstanceSync();this.originalJimuLayerInfo=this.layerInfosObj.getLayerOrTableInfoById(this.originalLayer.id);this.undoManager=new C;this._temporaryData={eventHandles:[],dijits:[]};this._tempPopup=new G({},g.create("div"));this._tempPopup.show()},destroy:function(){this._clearPage();this._tempPopup.destroy();this.inherited(arguments)},_getRelatedTableInfoArray:function(a){var b=
new l,c=[];a.getRelatedTableInfoArray("esriRelRoleOrigin").then(e.hitch(this,function(a){m.forEach(a,function(a){this._findTableInfoFromTableInfosParam(a)&&c.push(a)},this);b.resolve(c)}));return b},_getRelatedRecordsByQuery:function(a){var b=new l,c=new u,d=new w(a.destJimuLayerInfo.getUrl()),f=a.destJimuLayerInfo.layerObject.relationships.keyField,k=a.oriJimuLayerInfo.layerObject.objectIdField;c.where=f?f+" \x3d "+a.feature.attributes[f]:k+" \x3d "+a.feature.attributes[k];c.outFields=["*"];d.execute(c,
e.hitch(this,function(a){b.resolve(a)}));return b},_getRelatedRecordsByRelatedQuery:function(a){return a.oriJimuLayerInfo.getRelatedRecords(a.feature,a.destJimuLayerInfo,a.relationshipIndex)},_getOriRelationshipByDestLayer:function(a){var b=null,b=m.filter(a.oriJimuLayerInfo.layerObject.relationships,function(b){if(b.relatedTableId===a.destJimuLayerInfo.layerObject.layerId)return!0},this);return b=b[a.relationshipIndex]?b[a.relationshipIndex]:b[0]},_getDestRelationshipByDestLayer:function(a){var b=
null,b=m.filter(a.destJimuLayerInfo.layerObject.relationships,function(b){if(b.relatedTableId===a.oriJimuLayerInfo.layerObject.layerId)return!0},this);return b=b[a.relationshipIndex]?b[a.relationshipIndex]:b[0]},_createATI:function(a){var b;b=a.destJimuLayerInfo;var c=null,d,f=this._findTableInfoFromTableInfosParam(b);f&&(c=new h.ATI({layerInfos:[f],hideNavButtons:!0},g.create("div")),c.startup(),this._temporaryData.dijits.push(c),d=this._findTableInfoFromTableInfosParam(b),(d=p.getEditCapabilities(b.layerObject,
d).canDelete)||r(".atiButton.atiDeleteButton",c.domNode).addClass("hidden"));this._editWidget._configEditor.usingSaveButton&&(b=c.addButton(this.nls.save,"save-button related-record disable","after"),b=n(b,"click",e.hitch(this,this._onSaveBtnClick,a,c)),this._temporaryData.eventHandles.push(b));b=c.addButton(this.nls.close,"close-button related-record","before");b=n(b,"click",e.hitch(this,this._onCloseBtnClick));this._temporaryData.eventHandles.push(b);d&&(b=n(c,"delete",e.hitch(this,this._onDeleteBtnClick,
a)),this._temporaryData.eventHandles.push(b));b=n(c,"attribute-change",e.hitch(this,this._onAttributeChange,a));this._temporaryData.eventHandles.push(b);return c},_findTableInfoFromTableInfosParam:function(a){var b=null;m.some(this.tableInfosParam,function(c){if(c.featureLayer.id===a.id)return b=c,!0},this);return b},_keepReferentialIntegrity:function(a){var b=this._getOriRelationshipByDestLayer(a),c=this._getDestRelationshipByDestLayer(a),d,e,k={key:"",value:"",hasRelationshipTable:!1,originKeyFieldInRelationshipTable:"",
originValueInRelationshipTable:"",destKeyFieldInRelationshipTable:"",destValueInRelationshipTable:""};b.keyField&&c&&c.keyField?(d=p.ignoreCaseToGetFieldKey(a.oriJimuLayerInfo.layerObject,b.keyField),e=p.ignoreCaseToGetFieldKey(a.destJimuLayerInfo.layerObject,c.keyField),d&&e&&(k.key=e,k.value=a.feature.attributes[d])):b.keyField&&(d=p.ignoreCaseToGetFieldKey(a.oriJimuLayerInfo.layerObject,b.keyField))&&(k.key=d,k.value=a.feature.attributes[d]);b&&null!=b.relationshipTableId&&c&&null!=c.relationshipTableId&&
(k.hasRelationshipTable=!0,k.originKeyFieldInRelationshipTable=b.keyFieldInRelationshipTable,k.destKeyFieldInRelationshipTable=c.keyFieldInRelationshipTable,k.originValueInRelationshipTable=a.feature.attributes[d],a.relatedFeature&&(k.destValueInRelationshipTable=a.relatedFeature.attributes[e||d]));return k},_prepareNewRelatedRecord:function(a){var b=this._getTemplateFromLayerObject(a.destJimuLayerInfo.layerObject),b=e.mixin({},b?b.prototype.attributes:{});a=this._keepReferentialIntegrity(a);a.hasRelationshipTable||
(b[a.key]=a.value);return new v(null,null,b,null)},_prepareNewRelationshipRecord:function(a,b){var c=null,d={};a=this._keepReferentialIntegrity(this._createOperationData(a.feature,a.oriJimuLayerInfo,a.destJimuLayerInfo,b,a.relationshipIndex));a.hasRelationshipTable&&(d[a.originKeyFieldInRelationshipTable]=a.originValueInRelationshipTable,d[a.destKeyFieldInRelationshipTable]=a.destValueInRelationshipTable,c=new v(null,null,d,null));return c},_prepareRelationshipTableInfo:function(a){var b=this._getOriRelationshipByDestLayer(a).relationshipTableId,
c=null;if(null==b)return null;a=a.oriJimuLayerInfo.layerObject;var d=a.url.lastIndexOf("/"),f=a.url.slice(0,d)+"/"+b.toString();m.some(this.tableInfosParam,function(a){if(e.getObject("featureLayer.url",!1,a)&&x.removeProtocol(f.toString().toLowerCase()).replace(/\/+/g,"/")===x.removeProtocol(a.featureLayer.url.toString().toLowerCase()).replace(/\/+/g,"/"))return c=this.layerInfosObj.getLayerOrTableInfoById(a.featureLayer.id),!0},this);return c},_addNewRelationshipReocrd:function(a,b){var c=new l,
d=null;(a=this._prepareNewRelationshipRecord(b,a))&&(d=this._prepareRelationshipTableInfo(b));d&&d.layerObject?d.layerObject.applyEdits([a],null,null,e.hitch(this,function(){c.resolve()}),e.hitch(this,function(){console.warn("Failed to add relationship record.");c.resolve()})):c.resolve();return c},_addNewRelatedRecord:function(a,b){var c=new l,d=b.destJimuLayerInfo.layerObject;d.applyEdits([a],null,null,e.hitch(this,function(f){var k=f[0];if(k.success&&k.objectId){f=new u;var g=new w(d.url);f.where=
d.objectIdField+" \x3d "+k.objectId;f.outFields=["*"];g.execute(f,e.hitch(this,function(f){var g=f.features[0];g||(a.attributes[d.objectIdField]=k.objectId,g=a);this._addNewRelationshipReocrd(g,b).then(e.hitch(this,function(){c.resolve(g)}))}),e.hitch(this,function(){c.reject()}))}else c.reject()}),e.hitch(this,function(){c.reject()}));return c},_deleteRelatedRecord:function(a){var b=new l;a.destJimuLayerInfo.layerObject.applyEdits(null,null,[a.relatedFeature],e.hitch(this,function(){b.resolve()}),
e.hitch(this,function(){b.reject()}));return b},_updateRelatedRecordOnSave:function(a){this.loading.show();this._updateRelatedRecord(a).then(e.hitch(this,function(){this.loading.hide()}),e.hitch(this,function(){this.loading.hide()}))},_updateRelatedRecordOnClient:function(a,b){this._editWidget._startEditingSession();a.relatedFeature.attributes[b.fieldName]=b.fieldValue;var c=b.target;c&&c.updateCurrentSelectdFeature&&c.updateCurrentSelectdFeature([a.relatedFeature],a.destJimuLayerInfo.layerObject,
b.fieldName,b.fieldValue)},_updateRelatedRecordDirectly:function(a,b){this.loading.show();a.relatedFeature.attributes[b.fieldName]=b.fieldValue;this._updateRelatedRecord(a).then(e.hitch(this,function(){this.loading.hide();var c=b.target;c&&c.updateCurrentSelectdFeature&&c.updateCurrentSelectdFeature([a.relatedFeature],a.destJimuLayerInfo.layerObject,b.fieldName,b.fieldValue)}),e.hitch(this,function(){this.loading.hide()}))},_updateRelatedRecord:function(a){var b=new l;a.destJimuLayerInfo.layerObject.applyEdits(null,
[a.relatedFeature],null,e.hitch(this,function(){b.resolve()}),e.hitch(this,function(){b.reject()}));return b},_getDisplayTitleOfRelatedRecord:function(a,b,c){var d=a.getInfoTemplate();return(a="popupTitle"===c&&d?"function"===typeof d.title?d.title(b):d.title:this._getDisplayTitleFromPopup(a,b,c))?a:""},_getDisplayTitleFromPopup:function(a,b,c){(a=this._getPopupTemplateWithOnlyDisplayField(a,c))?(b.setInfoTemplate(a),this._tempPopup.setFeatures([b]),c=(c=r("td.attrValue",this._tempPopup.domNode)[0])&&
c.innerHTML,b.setInfoTemplate(null)):c=p.getAttrByFieldKey(b,c);return c},_getPopupTemplateWithOnlyDisplayField:function(a,b){a=a._getCustomPopupInfo(a.layerObject,[b]);return new H(a)},_getTemplateFromLayerObject:function(a){var b=null;a.templates&&a.templates[0]?b=a.templates[0]:a.types&&a.types[0]&&a.types[0].templates[0]&&(b=a.types[0].templates[0]);return b},showRelatedRecords:function(a){this._changeRefDomNode();var b=e.getObject("_wabProperties.originalLayerName",!1,a.destJimuLayerInfo.layerObject)||
a.destJimuLayerInfo.title;this._setOperationTitle(b);this._clearPage();this.loading.show();this._getRelatedRecordsByRelatedQuery(a).then(e.hitch(this,function(b){var c=a.oriJimuLayerInfo._getOriRelationshipByDestLayer(a.oriJimuLayerInfo.layerObject,a.destJimuLayerInfo.layerObject);c&&c.cardinality&&c.cardinality.toLowerCase&&0<=c.cardinality.toLowerCase().indexOf("onetoone")&&1<=b.length?this._hideAddNewBtn():this._showAddNewBtn(a);0<b.length?this._setTitle(window.jimuNls.popup.relatedRecords):this._setTitle(window.jimuNls.popup.noRelatedRecotds,
"font-normal");var f=this._showFieldSelector(a.destJimuLayerInfo);m.forEach(b,function(b,c){b._layer=a.destJimuLayerInfo.layerObject;var d=this._getDisplayTitleOfRelatedRecord(a.destJimuLayerInfo,b,f);c=g.create("div",{"class":"item record-item enable "+(0===c%2?"oddLine":"evenLine"),innerHTML:d},this.contentBox);c.relatedRecord=b;c=n(c,"click",e.hitch(this,function(){this._addOperation(h.OPERATION_SHOW_RELATED_RECORDS,a);this.showInspector(this._createOperationData(a.feature,a.oriJimuLayerInfo,a.destJimuLayerInfo,
b,a.relationshipIndex))}));this._temporaryData.eventHandles.push(c)},this);this.loading.hide()}))},showInspector:function(a){var b=!1;this._changeRefDomNode();var c=a.destJimuLayerInfo.layerObject,d=e.getObject("_wabProperties.originalLayerName",!1,c)||a.destJimuLayerInfo.title,c=e.getObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList",!1,c),f=this._getDisplayTitleOfRelatedRecord(a.destJimuLayerInfo,a.relatedFeature,c);"popupTitle"!==c&&(f=d+": "+f);this._setOperationTitle(f);this._clearPage();
(f=this._createATI(a))&&g.place(f.domNode,this.contentBox);d=a.destJimuLayerInfo.layerObject.objectIdField;c=a.relatedFeature.attributes[d];null===c||void 0===c?(a.destJimuLayerInfo.layerObject.clearSelection(),f.showFeature(a.relatedFeature,a.destJimuLayerInfo.layerObject),b=!0,r(".atiButton.atiDeleteButton",f.domNode).addClass("disable"),this._editWidget._startEditingSession()):(this.loading.show(),f=new u,f.where=d+" \x3d "+c,a.destJimuLayerInfo.layerObject.selectFeatures(f,E.SELECTION_NEW,e.hitch(this,
function(){this.loading.hide();var b=a.destJimuLayerInfo.layerObject.getSelectedFeatures();b&&b[0]&&b[0].geometry&&this._activeGraphicEdit(b[0],a.oriJimuLayerInfo)})));this.showRelatedTables(this._createOperationData(a.relatedFeature,a.destJimuLayerInfo,null,null,null),a,b)},showRelatedTables:function(a,b,c){this._getRelatedTableInfoArray(a.oriJimuLayerInfo).then(e.hitch(this,function(d){0<d.length&&this._setTitle(window.jimuNls.popup.relatedTables);var f={};m.forEach(d,function(d,t){void 0===f[d.id]?
f[d.id]=0:f[d.id]++;t=g.create("div",{"class":"item table-item "+(0===t%2?"oddLine ":"evenLine ")+(c?"disable ":"enable "),innerHTML:d.title},this.contentBox);if(!c){var k=f[d.id];t=n(t,"click",e.hitch(this,function(){var c;this._editWidget._configEditor.usingSaveButton?c=this._editWidget._popupConfirmDialog():(c=new l,c.resolve(!0));c.then(e.hitch(this,function(c){c&&d.getLayerObject().then(e.hitch(this,function(){b?this._addOperation(h.OPERATION_SHOW_INSPECTOR,b):this._addOperation(h.OPERATION_FIRST,
a);this.showRelatedRecords(this._createOperationData(a.feature,a.oriJimuLayerInfo,d,null,k))}))}))}));this._temporaryData.eventHandles.push(t)}},this)}))},showFirstPage:function(a,b){this._clearPage();this._revertRefDomNode();this.showRelatedTables(a);b&&(m.forEach(this._editWidget._jimuLayerInfos.getLayerInfoArray(),function(a){a.layerObject&&a.layerObject.clearSelection&&a.id!==this.originalJimuLayerInfo.id&&y.getInstance().clearSelection(a.layerObject)},this),this.originalFeature.setSymbol(this.originalLayer.getSelectionSymbol()),
this._activeGraphicEdit(this.originalFeature))},_activeGraphicEdit:function(a,b){b&&(b.id===this.originalJimuLayerInfo.id?this.originalFeature.setSymbol(null,!0):y.getInstance().clearSelection(b.layerObject));var c;this._editWidget.editor._editVertices=!0;this._editWidget.editor._activateEditToolbar(a);a.geometry&&(c="point"===a.geometry.type?a.geometry:a.geometry.getExtent().getCenter());this._editWidget.map.infoWindow.show(c)},_createOperationData:function(a,b,c,d,e){return{feature:a,oriJimuLayerInfo:b,
destJimuLayerInfo:c,relatedFeature:d,relationshipIndex:e||0}},_addOperation:function(a,b){this.undoManager.add(new h.Operation(a,b,this))},_onPreviouBtnClick:function(){var a;this._editWidget._configEditor.usingSaveButton?a=this._editWidget._popupConfirmDialog():(a=new l,a.resolve(!0));a.then(e.hitch(this,function(a){a&&this.undoManager.undo()}))},_onAddNewBtnClick:function(a){var b=a.destJimuLayerInfo.layerObject,c=this._prepareNewRelatedRecord(a),d=this._keepReferentialIntegrity(a);"Table"!==b.type?
this._editWidget._startEditingRelatedGraphic(a,d):this._editWidget._configEditor.usingSaveButton?(this._addOperation(h.OPERATION_SHOW_RELATED_RECORDS,a),this.showInspector(this._createOperationData(a.feature,a.oriJimuLayerInfo,a.destJimuLayerInfo,c,a.relationshipIndex))):(this.loading.show(),this._addNewRelatedRecord(c,a).then(e.hitch(this,function(b){this.loading.hide();this._addOperation(h.OPERATION_SHOW_RELATED_RECORDS,a);this.showInspector(this._createOperationData(a.feature,a.oriJimuLayerInfo,
a.destJimuLayerInfo,b,a.relationshipIndex))}),e.hitch(this,function(){this.loading.hide()})))},_onCloseBtnClick:function(){this._editWidget.editPopup.hide()},_onDeleteBtnClick:function(a){var b=a.relatedFeature.attributes[a.destJimuLayerInfo.layerObject.objectIdField];null!==b&&void 0!==b&&(this._editWidget._configEditor.usingSaveButton&&this._editWidget._stopEditingSession(),this.loading.show(),this._deleteRelatedRecord(a).then(e.hitch(this,function(){this.loading.hide();this._onPreviouBtnClick()}),
e.hitch(this,function(){this.loading.hide()})))},_onSaveBtnClick:function(a){if(this._editWidget._isEditingSession){var b=a.relatedFeature.attributes[a.destJimuLayerInfo.layerObject.objectIdField];null===b||void 0===b?(b=a.relatedFeature,this.loading.show(),this._addNewRelatedRecord(b,a).then(e.hitch(this,function(b){this.loading.hide();this.showInspector(this._createOperationData(a.feature,a.oriJimuLayerInfo,a.destJimuLayerInfo,b,a.relationshipIndex))}),e.hitch(this,function(){this.loading.hide()}))):
this._updateRelatedRecordOnSave(a);this._editWidget._stopEditingSession()}},_onAttributeChange:function(a,b){this._editWidget._configEditor.usingSaveButton?this._updateRelatedRecordOnClient(a,b):this._updateRelatedRecordDirectly(a,b)},_clearPage:function(){g.empty(this.contentBox);g.setStyle(this.addNewBtn,"display","none");m.forEach(this._temporaryData.eventHandles,function(a){a&&a.remove&&a.remove()},this);this._temporaryData.eventHandles=[];m.forEach(this._temporaryData.dijits,function(a){a&&a.destroy&&
a.destroy()},this);this._temporaryData.dijits=[]},_changeRefDomNode:function(){g.setStyle(this.refDomNode,"display","none");g.setStyle(this.operationBox,"display","block");g.addClass(this.domNode,"fix-height-mode");this.previouBtn.title=window.jimuNls.common.back;this.addNewBtn.title=window.jimuNls.common.newText;this.undoManager.peekUndo()?g.setStyle(this.previouBtn,"display","block"):g.setStyle(this.previouBtn,"display","none")},_revertRefDomNode:function(){g.setStyle(this.refDomNode,"display",
"block");g.setStyle(this.operationBox,"display","none");g.removeClass(this.domNode,"fix-height-mode")},_showAddNewBtn:function(a){var b=a.destJimuLayerInfo.layerObject,c=this._findTableInfoFromTableInfosParam(a.destJimuLayerInfo);p.getEditCapabilities&&p.getEditCapabilities(b,c).canCreate&&(g.setStyle(this.addNewBtn,"display","block"),a=n(this.addNewBtn,"click",e.hitch(this,this._onAddNewBtnClick,a)),this._temporaryData.eventHandles.push(a))},_hideAddNewBtn:function(){g.setStyle(this.addNewBtn,"display",
"none")},_setTitle:function(a,b){a&&g.create("div",{"class":"title-box "+(b?b:""),innerHTML:a},this.contentBox)},_setOperationTitle:function(a){g.setAttr(this.operationTitle,"innerHTML",a);g.setAttr(this.operationTitle,"title",a)},_showFieldSelector:function(a){var b="objecid",c=r(".title-box",this.contentBox)[0],d=a.layerObject,f=[];if(!c||!a)return b;var g=a.getPopupInfo();g&&g.title&&f.push({label:window.jimuNls.popup.saveAsPopupTitle,value:"popupTitle"});var h=this._findTableInfoFromTableInfosParam(a);
h&&h.fieldInfos&&m.forEach(h.fieldInfos,function(a){"globalid"!==a.fieldName.toLowerCase()&&"shape"!==a.fieldName.toLowerCase()&&f.push({label:a.label||a.fieldName,value:a.fieldName})});c=(new J({items:f})).placeAt(c);c.domNode.title=window.jimuNls.popup.chooseFieldTip;var h=e.getObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList",!1,d),l=p.ignoreCaseToGetFieldObject(a.layerObject,a.layerObject.displayField||a.layerObject.objectIdField),q=I.getInstance().getAppConfig();h?b=h:"2.3"===
q.configWabVersion&&l&&l.name?b=l.name:g&&g.title?b="popupTitle":l&&l.name?b=l.name:0<f.length&&(b=f[0].value);b&&(c.setHighlightValue(b),e.setObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList",b,d));this._temporaryData.dijits.push(c);a=n(c,"click-item",e.hitch(this,function(a,b){r(".item.record-item",this.contentBox).forEach(e.hitch(this,function(c){e.setObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList",b,d);var f=this._getDisplayTitleOfRelatedRecord(a,c.relatedRecord,
b);c.innerHTML=f}))},a));this._temporaryData.eventHandles.push(a);return b}});h.Operation=q([D],{constructor:function(a,b,c){this.operationName=a;this.operationData=b;this.relatedRecordsEditor=c},performUndo:function(){switch(this.operationName){case h.OPERATION_SHOW_RELATED_TABLES:return this.relatedRecordsEditor.showRelatedTables(this.operationData);case h.OPERATION_SHOW_RELATED_RECORDS:return this.relatedRecordsEditor.showRelatedRecords(this.operationData);case h.OPERATION_SHOW_INSPECTOR:return this.relatedRecordsEditor.showInspector(this.operationData);
default:return this.relatedRecordsEditor.showFirstPage(this.operationData,!0)}}});h.ATI=q([F],{constructor:function(){this._aiConnects=[];this._selection=[];this._toolTips=[]},addButton:function(a,b,c){c=c?c:"before";a=new z({label:a,"class":" atiButton "+b},g.create("div"));g.place(a.domNode,this.deleteBtn.domNode,c);return a},updateCurrentSelectdFeature:function(a,b,c,d){this._selection&&this._selection[0]&&c&&(this._selection[0].attributes[c]=d,b.ownershipBasedAccessControlForFeatures=!0,this.refresh(),
b.ownershipBasedAccessControlForFeatures=!1)},_getFields:function(a){return a.fields}});e.mixin(h,{OPERATION_SHOW_RELATED_TABLES:"showRelatedTables",OPERATION_SHOW_RELATED_RECORDS:"showRelatedRecords",OPERATION_SHOW_INSPECTOR:"showInspector",OPERATION_FIRST:"first"});return h});