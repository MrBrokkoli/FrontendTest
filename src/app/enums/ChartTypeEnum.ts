export enum ChartTypeEnum {
  Line = 'line',
  Bar = 'bar'
}

export const ChartTypeEnumToLabelMapping: Record<ChartTypeEnum, string> = {
  [ChartTypeEnum.Line]: "Line",
  [ChartTypeEnum.Bar]: "Bar"
};
