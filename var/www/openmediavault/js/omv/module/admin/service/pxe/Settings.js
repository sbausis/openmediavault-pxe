/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2014 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenMediaVault. If not, see <http://www.gnu.org/licenses/>.
 */
// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/form/field/SharedFolderComboBox.js")

/**
 * @class OMV.module.admin.service.pxe.Settings
 * @derived OMV.workspace.form.Panel
 */
Ext.define("OMV.module.admin.service.pxe.Settings", {
        extend: "OMV.workspace.form.Panel",
        requires: [
                "OMV.form.field.SharedFolderComboBox"
        ],

        rpcService: "PXE",
		rpcGetMethod: "getSettings", // name for the function in the rpc that gets the settings
		rpcSetMethod: "setSettings", // name for the function in the rpc that saves the settings

        /*plugins: [{
			ptype: "linkedfields",
			correlations: [{
				name: [
					"sharedfolderref",
					"enableWinPath",
					"use_new_syslinux"
				],
				conditions: [
					{ name: "enable", value: false }
				],
				properties: "disabled"
			},{
			
				name: "sharedfolderref",
				conditions: [
					{ name: "enable", value: true }
				],
				properties: "!allowBlank"
			}]
        }],*/

        getFormItems: function() {
			var me = this;
			return [{
				xtype:    "fieldset",
				title:    _("Settings"),
				fieldDefaults:  {
					labelSeparator: ""
				},
				items:  [{
					xtype: "checkbox",
					name: "enable",
					fieldLabel: _("Enable"),
					checked: false
				},{
					xtype: "sharedfoldercombo",
					name: "sharedfolderref",
					fieldLabel: _("Shared folder"),
					allowNone: true,
					plugins: [{
						ptype: "fieldinfo",
						text: _("The location of your PXE files.")
						}]
				},{
					xtype:	"checkbox",
					name:	"enableWinPath",
					fieldLabel:	_("Enable Windows Path Support"),
					checked: false,
                    plugins: [{
						ptype: "fieldinfo",
						text: _("If enabled, add -m /etc/tftp_remap.conf to the Extra options box in the tftp server tab.")
                    }]
				}]
			},{
				xtype:    "fieldset",
				name: 	"syslinux_fieldset",
				title:    _("Syslinux"),
				fieldDefaults:  {
					labelSeparator: ""
				},
				items:  [{
					xtype: "checkbox",
					name: "use_new_syslinux",
					fieldLabel: _("Use newest Syslinux"),
					checked: true
				},{
					xtype: "textfield",
					name: "syslinux_version",
					fieldLabel: _("Current Version:"),
		            allowBlank : true,
	                editable      : false
				},{
					xtype    : "button",
					name 	 : "update_syslinux",
					text     : _("Update Syslinux"),
					icon     : "images/reboot.png",
					iconCls  : Ext.baseCSSPrefix + "btn-icon-16x16",
	                scope   : this,
	                handler : Ext.Function.bind(me.onInstallButton, me, [ me ]),
	                margin  : "0 0 7 0"
				}]
			}];
		},
		
	    onInstallButton : function() {
	        var me = this;
	        var wnd = Ext.create("OMV.window.Execute", {
	            title           : _("Update Syslinux"),
	            rpcService      : "Pxe",
	            rpcMethod       : "updateSyslinux",
	            rpcParams       : {},
	            rpcIgnoreErrors : true,
	            hideStartButton : true,
	            hideStopButton  : true,
	            listeners       : {
	                scope     : me,
	                finish    : function(wnd, response) {
	                    wnd.appendValue(_("Done..."));
	                    wnd.setButtonDisabled("close", false);
						var field = me.findField("syslinux_version");
			            field.store.reload();
	                },
	                exception : function(wnd, error) {
	                    OMV.MessageBox.error(null, error);
	                    wnd.setButtonDisabled("close", false);
	                }
	            }
	        });
	        wnd.setButtonDisabled("close", true);
	        wnd.show();
	        wnd.start();
	    }
});

OMV.WorkspaceManager.registerPanel({
        id: "Settings",
        path: "/service/pxe",
        text: _("Settings"),
        position: 10,
        className: "OMV.module.admin.service.pxe.Settings"
});

/* ********************************** */

Ext.define("OMV.module.admin.service.pxe.Setting", {
        extend: "OMV.workspace.form.Panel",
        requires: [
                "OMV.form.field.SharedFolderComboBox"
        ],

        rpcService: "PXE",
		rpcGetMethod: "get", // name for the function in the rpc that gets the settings
		rpcSetMethod: "set", // name for the function in the rpc that saves the settings

        /*plugins: [{
			ptype: "linkedfields",
			correlations: [{
				name: [
					"sharedfolderref",
					"enableWinPath",
					"use_new_syslinux"
				],
				conditions: [
					{ name: "enable", value: false }
				],
				properties: "disabled"
			},{
			
				name: "sharedfolderref",
				conditions: [
					{ name: "enable", value: true }
				],
				properties: "!allowBlank"
			}]
        }],*/

        getFormItems: function() {
			var me = this;
			return [{
				xtype:    "fieldset",
				title:    _("Settings"),
				fieldDefaults:  {
					labelSeparator: ""
				},
				items:  [
					{
						xtype: "textfield",
						name: "syslinux_version",
						fieldLabel: _("Current Version:"),
			            allowBlank : true,
		                editable      : false
					}, {
						xtype: "textfield",
						name: "syslinux_version",
						fieldLabel: _("Current Version:"),
			            allowBlank : true,
		                editable      : false
					}
				]
			},{
				xtype:    "fieldset",
				title:    _("Settings"),
				fieldDefaults:  {
					labelSeparator: ""
				},
				items:  [{
					xtype: "checkbox",
					name: "enable",
					fieldLabel: _("Enable"),
					checked: false
				},{
					xtype: "sharedfoldercombo",
					name: "sharedfolderref",
					fieldLabel: _("Shared folder"),
					allowNone: true,
					plugins: [{
						ptype: "fieldinfo",
						text: _("The location of your PXE files.")
						}]
				},{
					xtype:	"checkbox",
					name:	"enableWinPath",
					fieldLabel:	_("Enable Windows Path Support"),
					checked: false,
                    plugins: [{
						ptype: "fieldinfo",
						text: _("If enabled, add -m /etc/tftp_remap.conf to the Extra options box in the tftp server tab.")
                    }]
				}]
			},{
				xtype:    "fieldset",
				name: 	"syslinux_fieldset",
				title:    _("Syslinux"),
				fieldDefaults:  {
					labelSeparator: ""
				},
				items:  [{
					xtype: "checkbox",
					name: "use_new_syslinux",
					fieldLabel: _("Use newest Syslinux"),
					checked: true
				},{
					xtype: "textfield",
					name: "syslinux_version",
					fieldLabel: _("Current Version:"),
		            allowBlank : true,
	                editable      : false
				},{
					xtype    : "button",
					name 	 : "update_syslinux",
					text     : _("Update Syslinux"),
					icon     : "images/reboot.png",
					iconCls  : Ext.baseCSSPrefix + "btn-icon-16x16",
	                scope   : this,
	                handler : Ext.Function.bind(me.onInstallButton, me, [ me ]),
	                margin  : "0 0 7 0"
				}]
			}];
		},
		
	    /*onInstallButton : function() {
	        var me = this;
	        var wnd = Ext.create("OMV.window.Execute", {
	            title           : _("Update Syslinux"),
	            rpcService      : "Pxe",
	            rpcMethod       : "updateSyslinux",
	            rpcParams       : {},
	            rpcIgnoreErrors : true,
	            hideStartButton : true,
	            hideStopButton  : true,
	            listeners       : {
	                scope     : me,
	                finish    : function(wnd, response) {
	                    wnd.appendValue(_("Done..."));
	                    wnd.setButtonDisabled("close", false);
						var field = me.findField("syslinux_version");
			            field.store.reload();
	                },
	                exception : function(wnd, error) {
	                    OMV.MessageBox.error(null, error);
	                    wnd.setButtonDisabled("close", false);
	                }
	            }
	        });
	        wnd.setButtonDisabled("close", true);
	        wnd.show();
	        wnd.start();
	    }*/
});

OMV.WorkspaceManager.registerPanel({
        id: "Setting",
        path: "/service/pxe",
        text: _("Setting"),
        position: 10,
        className: "OMV.module.admin.service.pxe.Setting"
});
