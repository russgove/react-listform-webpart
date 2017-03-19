import  FieldDefinition from './FieldDefinition';

export interface IFieldDefinitionProps {
  label: string;
  fieldDefinitions:Array<FieldDefinition>;
  listId:string;
  webUrl:string;

}