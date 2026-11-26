import CivicHearing from './CivicHearing.jsx';
import DecisionMatrix from './DecisionMatrix.jsx';
import EvidenceSort from './EvidenceSort.jsx';
import LayerCompare from './LayerCompare.jsx';
import FictionalNote from './FictionalNote.jsx';

function withNote(Template) {
  return function ActivityTemplate(props) {
    return <>{props.fictional && <FictionalNote />}<Template {...props} /></>;
  };
}

export const ACTIVITY_TEMPLATES = {
  'layer-compare': withNote(LayerCompare),
  'evidence-sort': withNote(EvidenceSort),
  'decision-matrix': withNote(DecisionMatrix),
  'civic-hearing': withNote(CivicHearing),
};
