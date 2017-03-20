import * as React from "react";
import * as _ from "lodash";
import { Web } from "sp-pnp-js";
import FieldDefinition from "./FieldDefinition";
import { IFieldDefinitionProps } from './IFieldDefinitionProps';
import { IFieldDefinitionState } from './IFieldDefinitionState';
import {
    IColumn, DetailsList, DetailsRow, Panel, PanelType,
    Label, Button, ButtonType, TextField, CommandBar, Dropdown, IDropdownOption, Toggle, Slider
} from "office-ui-fabric-react";

import { Guid, Log } from "@microsoft/sp-core-library";



export default class FieldDefinitions extends React.Component<IFieldDefinitionProps, IFieldDefinitionState> {
    private groupOptions: Array<IDropdownOption> = [];
    private toggleUpdated(item: any, column: IColumn, checked: boolean): void {
        debugger;
        item[column.fieldName] = checked;
        this.setState(this.state);
    }
    private renderToggle(item?: any, index?: number, column?: IColumn): any {

        return (<Toggle
            checked={item[column.fieldName]}
            onChanged={(val: boolean) => this.toggleUpdated(item, column, val)}

        >
        </Toggle>);
    }
    private dropDownUpdated(item: any, column: IColumn, selected: IDropdownOption): void {
        debugger;
        item[column.fieldName] = selected.text;
        this.setState(this.state);
    }

    private renderGroupSelect(item?: any, index?: number, column?: IColumn): any {

        return (<Dropdown
            label=""
            options={this.groupOptions}
            onChanged={(val: IDropdownOption) => this.dropDownUpdated(item, column, val)}
        >
        </Dropdown>);
    }
    private columns: Array<IColumn> = [
        {
            key: "internalName",
            name: "internalName",
            fieldName: "internalName",
            minWidth: 20,
            maxWidth: 200,
        },
        {
            key: "restrictVisibility",
            name: "restrictVisibility",
            fieldName: "restrictVisibility",
            minWidth: 20,
            maxWidth: 200,
            onRender: this.renderToggle.bind(this)

        },
        {
            key: "restrictVisibilityTo",
            name: "restrictVisibilityTo",
            fieldName: "restrictVisibilityTo",
            minWidth: 100,
            maxWidth: 200,
            onRender: this.renderGroupSelect.bind(this)

        },
        {
            key: "restrictUpdate",
            name: "restrictUpdate",
            fieldName: "restrictUpdate",
            minWidth: 20,
            maxWidth: 200,
            onRender: this.renderToggle.bind(this)
        },
        {
            key: "retrictUpdateTo",
            name: "retrictUpdateTo",
            fieldName: "retrictUpdateTo",
            minWidth: 100,
            maxWidth: 200,
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
                for (const siteGroup of siteGroups) {
                    this.groupOptions.push({
                        key: siteGroup.Title,
                        text: siteGroup.Title,
                    })
                }
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
                        headerText="Field Definitions">
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

