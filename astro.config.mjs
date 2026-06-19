// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Learn Dataspaces',
      description: 'Guided paths for understanding, integrating, and building sovereign data sharing systems.',
      sidebar: [
        { label: 'Understand a Dataspace', slug: 'use-case' },
        { label: 'Integrate a Participant', slug: 'system-integration' },
        { label: 'Set Up a Dataspace Platform', slug: 'platform-setup' },
        { label: 'Build a Dataspace Offering', slug: 'build-guide' },
      ],
    }),
  ],
});
