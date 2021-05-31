export const Color = {
  label: 'rgb(200,200,200)',
  value: 'rgb(255,255,255)',
  fade_text: 'rgb(140,140,140)',
  theme_back: 'rgb(13,32,43)',
  on_accent: '#58CCED',
  cost: [
    {cost: 0, color: 'rgb(1,1,1)'},
    {cost: 1, color: 'rgb(1,1,1)'},
    {cost: 2, color: 'rgb(20,101,46)'},
    {cost: 3, color: 'rgb(18,61,116)'},
    {cost: 4, color: 'rgb(121,48,127)'},
    {cost: 5, color: 'rgb(162,143,43)'},
  ],
};

export const getCostColor = (cost) => {
  switch (cost) {
    case '1':
      return Color.cost[1].color;
    case '2':
      return Color.cost[2].color;
    case '3':
      return Color.cost[3].color;
    case '4':
      return Color.cost[4].color;
    case '5':
      return Color.cost[5].color;
    default:
  }
};
