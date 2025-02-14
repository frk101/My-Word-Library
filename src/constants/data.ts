import Enums from './enums';
export const INITIAL_DATA = new Array(Enums.INITIAL_DATA_NAMES.length)
  .fill(0)
  .map((_, i) => ({name: Enums.INITIAL_DATA_NAMES[i], id: i + 1}));

export default {
  INITIAL_DATA: INITIAL_DATA,
};
