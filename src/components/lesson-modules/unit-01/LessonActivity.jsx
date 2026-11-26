import ActivityFrame from './ActivityFrame.jsx';
import GlobalConnectionLab from './GlobalConnectionLab.jsx';
import RegionalStrategyLab from './RegionalStrategyLab.jsx';
import CivicHearingLab from './CivicHearingLab.jsx';
import IntegrationTimelineLab from './IntegrationTimelineLab.jsx';
import SeparationEvidenceLab from './SeparationEvidenceLab.jsx';
import LivingRegionLab from './LivingRegionLab.jsx';
import GisLayerLab from './GisLayerLab.jsx';
import RoutePlanningLab from './RoutePlanningLab.jsx';
import ShelterSiteLab from './ShelterSiteLab.jsx';

const ACTIVITY_COMPONENTS = {
  'global-connection': GlobalConnectionLab,
  'regional-strategy': RegionalStrategyLab,
  'civic-hearing': CivicHearingLab,
  'integration-timeline': IntegrationTimelineLab,
  'separation-evidence': SeparationEvidenceLab,
  'living-region': LivingRegionLab,
  'gis-layers': GisLayerLab,
  'route-planning': RoutePlanningLab,
  'shelter-sites': ShelterSiteLab,
};

export default function LessonActivity({ lessonModule, record = {}, onChange, questions = [] }) {
  const Activity = ACTIVITY_COMPONENTS[lessonModule?.activity?.type];
  if (!Activity) return <p className="lab-caution" role="status">이 학습 절의 디지털 모듈 설정을 확인하세요.</p>;
  return <ActivityFrame lessonModule={lessonModule} value={record} onChange={onChange} questions={questions}>
    <Activity config={lessonModule.activity} value={record} onChange={onChange} questions={questions} />
  </ActivityFrame>;
}
