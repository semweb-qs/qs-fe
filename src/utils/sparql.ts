import { AppConfig } from '@/utils/AppConfig';

export const getVocab = (iriBase) => {
  return `${AppConfig.base_vocab}${iriBase.trim(':')}`;
};
