// ValidateInput
export interface RuleProp {
  type: 'required' | 'email' | 'range' | 'custom';
  message: string;
  validate?: () => boolean;
}
