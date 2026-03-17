# MIKAGE ASSET STATUS MODEL

## LIFECYCLE STATES

### Asset States
- **raw** - Newly ingested, unprocessed assets
- **candidate** - Under review, not yet validated
- **review** - Actively being evaluated
- **approved** - Validated for specific use cases
- **canonical** - Core reference assets, highest authority
- **deprecated** - Obsolete but retained for reference
- **rejected** - Failed validation, not usable

### State Flow Diagram
```
raw → candidate → review → approved → canonical
  ↓       ↓         ↓        ↓         ↓
rejected ← rejected ← rejected ← deprecated
```

## DETAILED STATE DEFINITIONS

### Raw State
**Description**: Newly ingested assets requiring initial processing
**Duration**: Temporary, should move to candidate within 24 hours
**Permissions**: Read-only for most users, editors can process
**Metadata Required**: Basic file info, source, initial tags
**Triggers**: Manual ingestion, automated import, bulk upload

### Candidate State
**Description**: Assets ready for initial validation review
**Duration**: Until first review completion
**Permissions**: Reviewers can evaluate, editors can modify metadata
**Metadata Required**: Complete basic metadata, preliminary tags
**Triggers**: Raw asset processing completed, manual candidate creation

### Review State
**Description**: Assets actively being evaluated by reviewers
**Duration**: Active review session (typically 1-2 hours)
**Permissions**: Reviewers full access, observers read-only
**Metadata Required**: Reviewer assignments, review criteria, progress tracking
**Triggers**: Candidate asset selected for review, re-evaluation requested

### Approved State
**Description**: Assets validated for specific use cases
**Duration**: Until promoted to canonical or deprecated
**Permissions**: Approved users can use, reviewers can re-evaluate
**Metadata Required**: Approval metadata, usage limitations, quality scores
**Triggers**: Successful review completion, conditional approval

### Canonical State
**Description**: Core reference assets with highest authority
**Duration**: Long-term, until officially deprecated
**Permissions**: Read-only for most users, senior editors can modify
**Metadata Required**: Complete canon metadata, authority level, usage rules
**Triggers**: Approved asset promoted by senior review board

### Deprecated State
**Description**: Obsolete assets retained for historical reference
**Duration**: Permanent archival
**Permissions**: Read-only access, administrators can manage
**Metadata Required**: Deprecation reason, replacement asset, historical notes
**Triggers**: Asset superseded, canon changes, quality standards updated

### Rejected State
**Description**: Assets that failed validation and are not usable
**Duration**: Temporary hold before deletion (30 days)
**Permissions**: Administrators only
**Metadata Required**: Rejection reasons, failure analysis, appeal status
**Triggers**: Failed review, quality standards not met, canon violations

## PROMOTION RULES

### Raw to Candidate
**Requirements**:
- Basic metadata completed
- Initial tagging completed
- File format validated
- No obvious quality issues

**Process**:
- Automated quality check passes
- Minimum metadata fields populated
- File integrity verified
- No forbidden content detected

**Authority**: Asset ingestion system, editors

### Candidate to Review
**Requirements**:
- Complete metadata
- Preliminary quality assessment
- Assigned reviewer(s)
- Review criteria established

**Process**:
- Reviewer assignment
- Review checklist prepared
- Quality metrics calculated
- Review session scheduled

**Authority**: Review coordinators, senior editors

### Review to Approved
**Requirements**:
- Pass all review criteria
- Minimum quality score achieved
- No critical failures
- Usage scope defined

**Process**:
- Complete review checklist
- Quality scoring completed
- Usage limitations documented
- Approval metadata recorded

**Authority**: Assigned reviewers, review board

### Approved to Canonical
**Requirements**:
- Exceptional quality score
- Core canon relevance
- Broad applicability
- Senior board approval

**Process**:
- Senior review board evaluation
- Canon relevance assessment
- Authority level assignment
- Canonical metadata completion

**Authority**: Senior review board, canon guardians

## REJECTION RULES

### Immediate Rejection
**Triggers**:
- Forbidden content detected
- Canon violations
- Quality below minimum thresholds
- Copyright or licensing issues

**Process**:
- Automatic rejection by system
- Rejection reason documented
- Asset moved to rejected state
- Notification sent to submitter

**Authority**: Automated systems, senior reviewers

### Review Rejection
**Triggers**:
- Failed review criteria
- Insufficient quality score
- Limited applicability
- Better alternatives exist

**Process**:
- Reviewer documents reasons
- Failure analysis completed
- Improvement suggestions provided
- Asset moved to rejected state

**Authority**: Assigned reviewers, review board

### Conditional Rejection
**Triggers**:
- Fixable issues identified
- Potential with modifications
- Resubmission allowed
- Specific improvements required

**Process**:
- Detailed feedback provided
- Improvement requirements documented
- Resubmission timeline set
- Asset returned to candidate state

**Authority**: Reviewers, review coordinators

## STATUS CHANGE AUTHORITY

### System-Level Changes
**Raw → Candidate**: Asset ingestion system
**Candidate → Review**: Review coordinators
**Review → Rejected**: Reviewers (with documentation)

### Review-Level Changes
**Review → Approved**: Assigned reviewers
**Approved → Review**: Reviewers (re-evaluation)
**Approved → Deprecated**: Senior editors

### Canon-Level Changes
**Approved → Canonical**: Senior review board
**Canonical → Deprecated**: Canon guardians
**Canonical → Review**: Canon guardians (rare cases)

### Administrative Changes
**Any State → Rejected**: Administrators (policy violations)
**Rejected → Raw**: Administrators (appeals process)
**Deprecated → Candidate**: Administrators (restoration)

## VALIDATION INTEGRATION

### Automated Validation
- Quality threshold checking
- Metadata completeness validation
- File format verification
- Duplicate detection

### Review Workflow Integration
- Review checklist population
- Quality scoring integration
- Approval workflow triggers
- Status change automation

### Canon Validator Integration
- Canon compliance checking
- Authority level validation
- Usage scope enforcement
- Reference quality assessment

### Quality Assurance Integration
- Quality metric calculation
- Trend analysis
- Performance tracking
- Improvement recommendations

## STATUS TRANSITION METADATA

### Transition Tracking
- Previous state
- New state
- Timestamp
- Responsible party
- Reason for change
- Associated review data

### Quality Metrics
- Quality score at transition
- Review criteria results
- Failure analysis (if applicable)
- Improvement suggestions

### Audit Trail
- Complete state history
- Modification timestamps
- User action logs
- System automated changes

## STATUS-BASED ACCESS CONTROL

### Raw State Access
- Ingestion system: Full access
- Editors: Process and modify
- Reviewers: Read-only
- General users: No access

### Candidate State Access
- Review coordinators: Full access
- Reviewers: Evaluate and comment
- Editors: Modify metadata
- General users: No access

### Review State Access
- Assigned reviewers: Full access
- Review coordinators: Oversight
- Senior editors: Read-only
- General users: No access

### Approved State Access
- Approved users: Use within scope
- Reviewers: Re-evaluate
- Senior editors: Modify metadata
- General users: Read-only

### Canonical State Access
- All users: Read-only reference
- Senior editors: Modify metadata
- Canon guardians: Full access
- System: Reference for generation

### Deprecated State Access
- All users: Read-only historical
- Administrators: Manage
- Researchers: Access with permission
- System: Not referenced

### Rejected State Access
- Administrators: Full access
- Original submitter: Read rejection reasons
- Reviewers: Access for learning
- System: Not referenced

## STATUS MONITORING AND REPORTING

### Status Distribution Reports
- Asset count by state
- Average time in each state
- Bottleneck identification
- Trend analysis

### Quality Metrics by Status
- Quality score distribution
- Common failure reasons
- Improvement patterns
- Success rates

### Workflow Efficiency
- Processing time metrics
- Review completion rates
- Approval rates
- Rejection analysis

### Compliance Monitoring
- Canon compliance by status
- Authority level adherence
- Usage scope compliance
- Policy violation tracking
