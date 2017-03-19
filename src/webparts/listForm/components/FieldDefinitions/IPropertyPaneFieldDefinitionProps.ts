import FieldDefinition from "./FieldDefinition";
export interface IPropertyPaneFieldDefinitionProps {
  label: string;
  fieldDefinitions: Array<FieldDefinition>
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  disabled?: boolean;
  listId:string;
  webUrl:string;
}