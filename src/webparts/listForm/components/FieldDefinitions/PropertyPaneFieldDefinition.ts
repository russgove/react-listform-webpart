import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { IDropdownOption } from 'office-ui-fabric-react';
import { IPropertyPaneFieldDefinitionProps } from './IPropertyPaneFieldDefinitionProps';
import { IPropertyPaneFieldDefinitionInternalProps } from './IPropertyPaneFieldDefinitionInternalProps';
import FieldDefinitions from './FieldDefinitions';
import { IFieldDefinitionProps } from './IFieldDefinitionProps';

export default class PropertyPaneFieldDefinition implements IPropertyPaneField<IPropertyPaneFieldDefinitionProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneFieldDefinitionInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneFieldDefinitionProps) {
     
        this.targetProperty = targetProperty;
        this.properties = {
            label: properties.label,
            key: "key?",
            fieldDefinitions: properties.fieldDefinitions,
            onPropertyChange: properties.onPropertyChange,
            listId: properties.listId,
            webUrl:properties.webUrl,
            disabled: properties.disabled,
            onRender: this.onRender.bind(this)
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }

    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<IFieldDefinitionProps> = React.createElement(FieldDefinitions, {
            label: this.properties.label,
            fieldDefinitions: this.properties.fieldDefinitions,
            listId: this.properties.listId,
            webUrl:this.properties.webUrl
        });
        ReactDom.render(element, elem);
    }

    private onChanged(option: IDropdownOption, index?: number): void {
        this.properties.onPropertyChange(this.targetProperty, option.key);
    }
}