// ValidateInput
export interface RuleProp {
  type: 'required' | 'email' | 'range' | 'custom';
  message: string;
  validater?: () => boolean;
}
