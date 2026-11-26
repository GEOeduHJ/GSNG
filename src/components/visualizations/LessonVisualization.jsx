import ModuleVisualization from './ModuleVisualization.jsx';
import TerrainConceptModel from './TerrainConceptModel.jsx';
import CaseStudyGallery from '../CaseStudyGallery.jsx';

const TYPE_ALIASES = {
  'flow-map': 'flow-map',
  'timeline-map': 'timeline-map',
  'gis-case': 'gis-case',
  climate: 'climate',
  'layer-map': 'layer-map',
  'terrain-model': 'terrain-model',
  terrain: 'terrain-model',
  'story-map': 'story-map',
  'culture-place': 'story-map',
  'culture-map': 'story-map',
  'food-flow': 'food-flow',
  population: 'population',
  'food-systems': 'food-systems',
  'value-chain': 'value-chain',
  network: 'value-chain',
  energy: 'energy',
  environment: 'environment',
  peace: 'peace',
};

export default function LessonVisualization({ lesson, module, showCaseStudies = true }) {
  const type = TYPE_ALIASES[lesson.visualization?.type];
  const lessonCaseStudies = lesson.caseStudies || [];
  if (type === 'terrain-model') return <><TerrainConceptModel />{showCaseStudies && lessonCaseStudies.length > 0 && <CaseStudyGallery caseStudies={lessonCaseStudies} />}</>;

  const moduleVisualization = {
    ...module,
    visualization: {
      ...module.visualization,
      type: type || module.visualization.type,
      title: lesson.visualization?.title || module.visualization.title,
      hint: lesson.visualization?.description || module.visualization.hint,
    },
  };

  return (
    <div className="lesson-tool-wrap">
      <ModuleVisualization module={moduleVisualization} />
      <p className="visual-source-note">{lesson.visualization?.textAlternative}</p>
      {showCaseStudies && lessonCaseStudies.length > 0 && <CaseStudyGallery caseStudies={lessonCaseStudies} />}
    </div>
  );
}
