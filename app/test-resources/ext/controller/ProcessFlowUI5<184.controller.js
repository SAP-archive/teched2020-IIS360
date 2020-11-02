//beta example code. This might change in the future
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageToast',
	'sap/fe/core/controllerextensions/FlexibleColumnLayout',
	'sap/fe/core/controllerextensions/Routing'
],
function (jQuery, Controller, JSONModel, MessageToast, FCLExtension, RoutingExtension) {
	"use strict";

	return Controller.extend("sap.fe.demo.incidents.ext.controller.ProcessFlow", {
		constructor: function () {
			Controller.apply(this, arguments);
			this.routing = new RoutingExtension();
			this.fcl = new FCLExtension();
		},

		onInit: function () {
			var oView = this.getView();
			this.routing.configure(this.getView(), this.fcl);
			this.fcl.configure(this.getView(), this.routing);
			this.oProcessFlow1 = oView.byId("processflow1");

            var sDataPath = jQuery.sap.getModulePath("sap.fe.demo.incidents.ext.controller", "/ProcessFlowLanesAndNodes.json");
            var oModelPf1 = new JSONModel(sDataPath);
            oView.setModel(oModelPf1, "ProcessFlowModel");
            oModelPf1.attachRequestCompleted(this.oProcessFlow1.updateModel.bind(this.oProcessFlow1));
        },

        onNodePress: function (event) {
            MessageToast.show("Node " + event.getParameters().getNodeId() + " has been clicked.");
        }
    });
});