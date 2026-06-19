// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Learn Dataspaces',
      description: 'Guided paths for understanding, integrating, and building sovereign data sharing systems.',
      sidebar: [
        {
          label: 'Understand a Dataspace',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'use-case' },
            { label: 'The Problem', slug: 'use-case/the-problem' },
            { label: 'The Companies', slug: 'use-case/the-companies' },
            { label: 'How a Dataspace Works', slug: 'use-case/how-a-dataspace-works' },
            { label: 'VeloForge Shares a Certificate', slug: 'use-case/veloforge-shares' },
            { label: 'FerroLink Gets What It Needs', slug: 'use-case/ferrolink-gets' },
            { label: 'FerroLink Becomes a Provider Too', slug: 'use-case/ferrolink-provides' },
            { label: 'QuantisSeal Adds Trust', slug: 'use-case/quantisseal-adds-trust' },
            { label: 'LumenDrive Assembles the Picture', slug: 'use-case/lumendrive-assembles' },
            { label: 'NebulaFlow Sees Everything', slug: 'use-case/nebulaflow-sees-everything' },
            { label: 'Documents Get Updated', slug: 'use-case/documents-get-updated' },
            { label: 'What Happens When Trust Changes', slug: 'use-case/trust-changes' },
            { label: 'What We Built', slug: 'use-case/what-we-built' },
          ],
        },
        {
          label: 'Integrate a Participant',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'system-integration' },
            { label: 'Publishing Data', slug: 'system-integration/publishing-data' },
            { label: 'Consuming Data', slug: 'system-integration/consuming-data' },
            { label: 'The Management API', slug: 'system-integration/management-api' },
            { label: 'The Identity Hub', slug: 'system-integration/identity-hub' },
            { label: 'Data Plane Architecture', slug: 'system-integration/data-plane-architecture' },
            { label: 'Deploying a Data Plane', slug: 'system-integration/deploying-a-data-plane' },
          ],
        },
        {
          label: 'Set Up a Dataspace Platform',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'platform-setup' },
            { label: 'Infrastructure Prerequisites', slug: 'platform-setup/prerequisites' },
            { label: 'EDC Services', slug: 'platform-setup/edc-services' },
            { label: 'Connector Fabric Manager', slug: 'platform-setup/connector-fabric-manager' },
            { label: 'Activity Agents', slug: 'platform-setup/activity-agents' },
            { label: 'Identity Provider Setup', slug: 'platform-setup/identity-provider-setup' },
            { label: 'Onboarding Design', slug: 'platform-setup/onboarding-design' },
            { label: 'Provisioning Participants', slug: 'platform-setup/provisioning-participants' },
            { label: 'Customer Handoff', slug: 'platform-setup/customer-handoff' },
          ],
        },
        {
          label: 'Build a Dataspace Offering',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'build-guide' },
            { label: 'The Component Map', slug: 'build-guide/components' },
            { label: 'The CSP Baseline', slug: 'build-guide/baseline' },
            { label: 'Portal and Observability', slug: 'build-guide/portal' },
            { label: 'Customer Applications', slug: 'build-guide/customer-apps' },
            { label: 'Multiple Data Planes and Credential Issuance', slug: 'build-guide/full-build-out' },
          ],
        },
      ],
    }),
  ],
});
