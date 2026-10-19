// How each case-study stage is written on the page (the schema stores lower-case ids).
export const STAGE_LABELS: Record<string, string> = {
  design: 'Design',
  wordpress: 'WordPress',
  seo: 'SEO',
  qa: 'QA',
};

export const stageLabel = (stage: string) => STAGE_LABELS[stage] ?? stage;
