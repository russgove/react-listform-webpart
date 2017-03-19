import * as React from "react";
import * as _ from "lodash";
import { Web } from "sp-pnp-js";
import FieldDefinition from "./FieldDefinition";
import { IFieldDefinitionProps } from './IFieldDefinitionProps';
import { IFieldDefinitionState } from './IFieldDefinitionState';
import { IColumn, DetailsList, DetailsRow, Panel, PanelType, Label, Button, ButtonType, TextField, CommandBar, Dropdown, IDropdownOption, Toggle, Slider } from "office-ui-fabric-react";

import { Guid, Log } from "@microsoft/sp-core-library";



export default class FieldDefinitions extends React.Component<IFieldDefinitionProps, IFieldDefinitionState> {
    
    private renderRestrictVisibility(item?: any, index?: number, columncc?: IColumn):any{

    }
    private columns: Array<IColumn> = [
        {
            key: "internalName",
            name: "internalName",
            fieldName: "internalName",
            minWidth: 20,
            maxWidth:200,
        },
        {
            key: "restrictVisibility",
            name: "restrictVisibility",
            fieldName: "restrictVisibility",
            minWidth: 20,
            onRender:{this.renderRestrictVisibility.bind(this)}

        },
        {
            key: "restrictVisibilityTo",
            name: "restrictVisibilityTo",
            fieldName: "restrictVisibilityTo",
            minWidth: 100
        },
         {
            key: "restrictUpdate",
            name: "restrictUpdate",
            fieldName: "restrictUpdate",
            minWidth: 20
        },
        {
            key: "retrictUpdateTo",
            name: "retrictUpdateTo",
            fieldName: "retrictUpdateTo",
            minWidth: 100
        },
    ];

    public constructor() {
        super();

        this.onClosePanel = this.onClosePanel.bind(this);
        this.onOpenPanel = this.onOpenPanel.bind(this);
        this.state = {
            showPanel: false,
            fieldDefinitions: [],

        };
    }
    public componentWillMount(): void {
        const spWeb: Web = new Web(this.props.webUrl);
        spWeb.lists.getById(this.props.listId).fields.get()
            .then((fields) => {
                for (const field of fields) {

                    if (!field.Hidden) {
                        const existingDef = _.find(this.state.fieldDefinitions, f => { return f.internalName === field.InternalName });
                        if (!existingDef) {
                            this.state.fieldDefinitions.push(new FieldDefinition(field.InternalName))
                        }
                    }
                }
                this.setState(this.state);
            })
            .catch((e) => {
                debugger;
            });
        spWeb.siteGroups.get()
            .then((siteGroups) => {
                debugger;
            })
            .catch((e) => {
                debugger;
            });
    }

    public onOpenPanel() {

        this.state.showPanel = true;
        this.setState(this.state);
    }
    public onClosePanel() {
        this.state.showPanel = true;
        this.setState(this.state);
    }
    public render() {
        return (
            <div style={{ marginBottom: '8px' }}>
                <Label>{this.props.label}</Label>
                <Button onClick={this.onOpenPanel}>Field Definitions</Button>
                {this.state.showPanel === true ?
                    <Panel
                        isOpen={this.state.showPanel} hasCloseButton={true} onDismiss={this.onClosePanel}
                        isLightDismiss={true} type={PanelType.large}
                        headerText="Field Defonotions">
                        <DetailsList
                            items={this.state.fieldDefinitions}
                            columns={this.columns}                  
                        >
                        </DetailsList>
                    </Panel>
                    : ''}

            </div>
        );

    };
}

