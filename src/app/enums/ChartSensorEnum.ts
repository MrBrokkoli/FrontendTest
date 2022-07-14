export enum ChartSensorEnum {
  Temperature = 'temperature',
  Humidity = 'humidity',
  Light = 'light',
  All = 'all'
}

export const ChartSensorEnumToLabelMapping: Record<ChartSensorEnum, string> = {
  [ChartSensorEnum.Temperature]: "Temperature",
  [ChartSensorEnum.Humidity]: "Humidity",
  [ChartSensorEnum.Light]: "Light",
  [ChartSensorEnum.All]: "All"
};