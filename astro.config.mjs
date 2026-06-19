// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://dataspacebuilder.github.io',
  base: '/learning-paths',
  integrations: [
    starlight({
      title: 'Learn Dataspaces',
      description: 'Guided paths for understanding, operating, and building sovereign data sharing systems.',
      sidebar: [
        {
          label: 'A Dataspace Use Case',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'use-case' },
            { label: 'The Problem', slug: 'use-case/the-problem' },
            { label: 'The Companies', slug: 'use-case/the-companies' },
            { label: 'How a Dataspace Works', slug: 'use-case/how-a-dataspace-works' },
            { label: 'Provider Publishes Data', slug: 'use-case/provider-publishes-data' },
            { label: 'Consumer Discovers and Negotiates', slug: 'use-case/consumer-discovers-and-negotiates' },
            { label: 'Consumer Becomes Provider', slug: 'use-case/consumer-becomes-provider' },
            { label: 'Trust Enters the Picture', slug: 'use-case/trust-enters-the-picture' },
            { label: 'Multiple Consumers and Use Cases', slug: 'use-case/multiple-consumers-and-use-cases' },
            { label: 'Updates and Notifications', slug: 'use-case/updates-and-notifications' },
            { label: 'Trust Changes', slug: 'use-case/trust-changes' },
            { label: 'What We Built', slug: 'use-case/what-we-built' },
            { label: 'Is a Dataspace Right for You?', slug: 'use-case/is-a-dataspace-right-for-you' },
          ],
        },
        {
          label: 'Set Up a Dataspace Platform',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'platform-setup' },
            { label: 'Platform Operating Models', slug: 'platform-setup/platform-operating-models' },
            { label: 'Component Map', slug: 'platform-setup/component-map' },
            { label: 'What Eclipse Provides vs. What You Build', slug: 'platform-setup/responsibility-split' },
            { label: 'Infrastructure Prerequisites', slug: 'platform-setup/prerequisites' },
            { label: 'Deploy EDC Services', slug: 'platform-setup/edc-services' },
            { label: 'Deploy Connector Fabric Manager', slug: 'platform-setup/connector-fabric-manager' },
            { label: 'Deploy Activity Agents', slug: 'platform-setup/activity-agents' },
            { label: 'Identity Provider Setup', slug: 'platform-setup/identity-provider-setup' },
            { label: 'Dataspace Profiles and Cells', slug: 'platform-setup/dataspace-profiles-and-cells' },
            { label: 'Provision Participants', slug: 'platform-setup/provisioning-participants' },
            { label: 'Customer Handoff', slug: 'platform-setup/customer-handoff' },
            { label: 'Self-Hosted Connector Track', slug: 'platform-setup/self-hosted-connector-track' },
            { label: 'Add Portal and Observability', slug: 'platform-setup/portal-and-observability' },
            { label: 'Add Data Plane Capabilities', slug: 'platform-setup/data-plane-capabilities' },
            { label: 'Optional Platform Services', slug: 'platform-setup/optional-platform-services' },
            { label: 'From Baseline to Offering', slug: 'platform-setup/baseline-to-offering' },
          ],
        },
        {
          label: 'Build a Dataspace Application',
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
      ],
    }),
  ],
});
