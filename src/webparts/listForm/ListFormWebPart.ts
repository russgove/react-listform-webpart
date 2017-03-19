import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import FieldDefinition from "./components/FieldDefinitions/FieldDefinition";
import PropertyPaneFieldDefinition from "./components/FieldDefinitions/PropertyPaneFieldDefinition";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneField,
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';

import * as strings from 'listFormStrings';
import ListForm from './components/ListForm';
import { IListFormProps } from './components/IListFormProps';
import { IListFormWebPartProps } from './IListFormWebPartProps';
export interface IPropertyFieldDefinitionsPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialValue?: Array<FieldDefinition>;
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  columnDefinitions: Array<FieldDefinition>;
}

export default class ListFormWebPart extends BaseClientSideWebPart<IListFormWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListFormProps> = React.createElement(
      ListForm,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected onFieldDefinitionsChange() {
    return Version.parse('1.0');
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                new PropertyPaneFieldDefinition("FieldDefinitions", {
                  label: "fields",
                  fieldDefinitions: this.properties.fields,
                  onPropertyChange: this.onFieldDefinitionsChange.bind(this),
                  listId: "4135a310-6e4f-46dc-8ac9-62e0007e5117",
                  // listId:this.context.pageContext.list.id.toString()
                  webUrl: "https://rgove3.sharepoint.com/"

                })
              ]
            }
          ]
        }
      ]
    };
  }
}
