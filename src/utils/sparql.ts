import { AppConfig } from '@/utils/AppConfig';

export const sparqlTerms = {
  rdfsLabel: 'http://www.w3.org/2000/01/rdf-schema#label',
  baseVocab: 'http://qs.hocky.id/v/',
  baseProp: 'http://qs.hocky.id/p/',
};

export const getVocab = (iriBase) => {
  return `${sparqlTerms.baseVocab}${iriBase.trim(':')}`;
};

export const getLabel = (n3store, iri) => {
  return n3store.match(iri, sparqlTerms.rdfsLabel)[0].object.value;
};
