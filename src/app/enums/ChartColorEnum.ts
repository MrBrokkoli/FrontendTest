export enum ChartColorEnum {
  Default = 'black',
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Gray = 'gray',
  Lime = '#01ff70',
  Fuchsia = '#f012be',
  Maroon = '#85144b',
  Olive = '#3d9970'
}

export const ChartColorEnumToLabelMapping: Record<ChartColorEnum, string> = {
  [ChartColorEnum.Default]: "Black",
  [ChartColorEnum.Red]: "Red",
  [ChartColorEnum.Green]: "Green",
  [ChartColorEnum.Blue]: "Blue",
  [ChartColorEnum.Gray]: "Gray",
  [ChartColorEnum.Lime]: "Lime",
  [ChartColorEnum.Fuchsia]: "Fuchsia",
  [ChartColorEnum.Maroon]: "Maroon",
  [ChartColorEnum.Olive]: "Olive"
};