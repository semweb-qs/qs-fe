export const sparqlTerms = {
  rdfsLabel: 'http://www.w3.org/2000/01/rdf-schema#label',
  baseVocab: 'http://qs.hocky.id/v/',
  baseProp: 'https://qs.hocky.id/p/',
  rdfLabel: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
};

export const getVocab = (iriBase) => {
  return `${sparqlTerms.baseVocab}${iriBase.trim(':')}`;
};
export const getProp = (iriBase) => {
  return `${sparqlTerms.baseProp}${iriBase.trim(':')}`;
};

export const getIRIEnding = (iri) => {
  return iri.split('/').slice(-1)[0].split('#').slice(-1)[0];
};

export const getLabelFromStore = (n3store, iri) => {
  try {
    const matched = n3store.getQuads(iri, sparqlTerms.rdfsLabel);
    return matched[0].object.value;
  } catch {
    return '';
  }
};

export const getPropFromStore = (n3store, iri, propIri) => {
  try {
    const matched = n3store.getQuads(iri, propIri);
    return matched[0].object.value;
  } catch {
    return '';
  }
};

export const getIRILabelFromStore = (n3store, propIri, cutFallback = true) => {
  try {
    const matched = n3store.getQuads(propIri, sparqlTerms.rdfsLabel);
    return matched[0].object.value;
  } catch {
    if (!cutFallback) {
      return propIri;
    }
    return propIri.split('/').slice(-1)[0].split('#').slice(-1)[0];
  }
};

export const ignoredPredicate = new Set();
