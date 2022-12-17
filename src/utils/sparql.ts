export const sparqlTerms = {
  rdfsLabel: 'http://www.w3.org/2000/01/rdf-schema#label',
  baseVocab: 'http://qs.hocky.id/v/',
  baseProp: 'https://qs.hocky.id/p/',
};

export const getVocab = (iriBase) => {
  return `${sparqlTerms.baseVocab}${iriBase.trim(':')}`;
};
export const getProp = (iriBase) => {
  return `${sparqlTerms.baseProp}${iriBase.trim(':')}`;
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

export const getPropLabelFromStore = (n3store, propIri) => {
  try {
    const matched = n3store.getQuads(propIri, sparqlTerms.rdfsLabel);
    return matched[0].object.value;
  } catch {
    console.log(propIri.split('/'));
    const iris = propIri.split('/').slice(-1)[0].split('#').slice(-1)[0];
    return iris;
  }
};
