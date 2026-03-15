import {
  compileOutputSchema,
  compileRequestSchema,
  type CompileOutput,
  type CompileRequest,
  type CompileSection
} from '@mikage/contracts';

const SECTION_ORDER: CompileSection['key'][] = [
  'system_frame',
  'canon_constraints',
  'context_packet_summary',
  'mode_payload',
  'output_instructions',
  'negative_prompt_shell',
  'lineage_metadata'
];

const buildSections = (request: CompileRequest): CompileSection[] => {
  const contextSummary = request.contextPackets
    .map(
      (packet) =>
        `${packet.packetRef.packetCode}: ${packet.summary} | ${packet.fragments
          .map((fragment) => `${fragment.label}: ${fragment.summary}`)
          .join('; ')}`
    )
    .join('\n');

  const negativePromptRendered =
    request.negativePrompt.rendered ||
    request.negativePrompt.clauses.join(', ') ||
    'none';

  const lineageSummary = [
    `requestCode=${request.lineage.requestCode}`,
    `presetCode=${request.lineage.presetCode}`,
    `variantCode=${request.lineage.variantCode}`,
    `packetRefs=${request.lineage.packetRefs.map((packet) => packet.packetCode).join(', ') || 'none'}`
  ].join('\n');

  const sectionMap: Record<CompileSection['key'], CompileSection> = {
    system_frame: {
      key: 'system_frame',
      title: 'System Frame',
      content: request.systemFrame
    },
    canon_constraints: {
      key: 'canon_constraints',
      title: 'Canon Constraints',
      content: request.canonConstraints.join('\n')
    },
    context_packet_summary: {
      key: 'context_packet_summary',
      title: 'Context Packet Summary',
      content: contextSummary
    },
    mode_payload: {
      key: 'mode_payload',
      title: `Mode Payload: ${request.modePayload.title}`,
      content: request.modePayload.instructions.join('\n')
    },
    output_instructions: {
      key: 'output_instructions',
      title: 'Output Instructions',
      content: request.outputInstructions.join('\n')
    },
    negative_prompt_shell: {
      key: 'negative_prompt_shell',
      title: 'Negative Prompt Shell',
      content: negativePromptRendered
    },
    lineage_metadata: {
      key: 'lineage_metadata',
      title: 'Lineage Metadata',
      content: lineageSummary
    }
  };

  return SECTION_ORDER.map((key) => sectionMap[key]);
};

export const compilePrompt = (input: CompileRequest): CompileOutput => {
  const request = compileRequestSchema.parse(input);
  const sections = buildSections(request);
  const validation = {
    valid: true,
    issues: []
  };

  return compileOutputSchema.parse({
    requestCode: request.requestCode,
    compileMode: request.compileMode,
    sections,
    compiledPrompt: sections
      .map((section) => `## ${section.title}\n${section.content}`)
      .join('\n\n'),
    negativePrompt: {
      clauses: request.negativePrompt.clauses,
      rendered:
        request.negativePrompt.rendered ||
        request.negativePrompt.clauses.join(', ') ||
        'none'
    },
    lineage: request.lineage,
    validation
  });
};
