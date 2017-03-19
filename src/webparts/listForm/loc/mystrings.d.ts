declare interface IListFormStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'listFormStrings' {
  const strings: IListFormStrings;
  export = strings;
}
