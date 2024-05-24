export type BtnTypes = 'normal' | 'primary';
export type BtnEmits = 'close' | 'open-line' | 'cancel' | 'apply' | 'add' | 'choose' | 'delete';

export interface IBtn {
  name: string;
  label: string;
  type?: BtnTypes;
  emit?: BtnEmits;
}
