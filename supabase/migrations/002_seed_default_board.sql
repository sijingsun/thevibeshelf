-- Auto-generated seed — reflects live DB state
-- Re-run this to restore the default board to its current state

-- Board
INSERT INTO boards (id, owner_id, title, description, is_public) VALUES (
  '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b', 'VibeStack — Curated Dev Resources',
  'A living collection of the best tools, libraries, and references for vibe coding. Contribute to add your own.', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, description = EXCLUDED.description, is_public = EXCLUDED.is_public;

-- Columns
INSERT INTO columns (id, board_id, title, position)
VALUES ('d14b2f38-6097-4e30-8842-ec664f1b8a41', '8cb0c064-74bd-42d9-9274-ef70de465006', 'Design References', 0)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, position = EXCLUDED.position;
INSERT INTO columns (id, board_id, title, position)
VALUES ('559cde71-7e54-4b40-a592-a947063b934a', '8cb0c064-74bd-42d9-9274-ef70de465006', 'UI Libraries', 1)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, position = EXCLUDED.position;
INSERT INTO columns (id, board_id, title, position)
VALUES ('e736f801-5763-4b92-b362-da5ba94f1d5d', '8cb0c064-74bd-42d9-9274-ef70de465006', 'Vibe Coding Tools', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, position = EXCLUDED.position;
INSERT INTO columns (id, board_id, title, position)
VALUES ('e00aabb9-86e6-4f45-bed4-a28a1026a2cf', '8cb0c064-74bd-42d9-9274-ef70de465006', 'Backend & Deployment', 3)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, position = EXCLUDED.position;
INSERT INTO columns (id, board_id, title, position)
VALUES ('8b492963-b59b-4ffc-9489-4096c87bd5b1', '8cb0c064-74bd-42d9-9274-ef70de465006', 'Tips & Tutorials', 4)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, position = EXCLUDED.position;

-- Resources
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '8e8296b9-e939-4139-a88d-e5e2bc3493cf', '559cde71-7e54-4b40-a592-a947063b934a', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Tailwind CSS', 'https://tailwindcss.com', 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
  'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=32', ARRAY['css','utility-first','styling'], 0, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '25eb07f4-74e5-45f4-9838-6679380e44f7', '559cde71-7e54-4b40-a592-a947063b934a', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'shadcn/ui', 'https://ui.shadcn.com', 'Beautifully designed components built with Radix UI and Tailwind CSS. Copy-paste into your project.',
  'https://www.google.com/s2/favicons?domain=ui.shadcn.com&sz=32', ARRAY['components','tailwind','design-system'], 0, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '109dbda4-a5d5-4055-b754-913a767adec9', '559cde71-7e54-4b40-a592-a947063b934a', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Framer Motion', 'https://www.framer.com/motion', 'A production-ready motion library for React. Effortless animations and interactions.',
  'https://www.google.com/s2/favicons?domain=framer.com&sz=32', ARRAY['animation','react','motion'], 1, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '57222c3d-b727-4180-b547-45267a0a8498', '559cde71-7e54-4b40-a592-a947063b934a', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Lucide Icons', 'https://lucide.dev', 'Beautiful and consistent icon library. 1000+ open-source SVG icons for React, Vue, and more.',
  'https://www.google.com/s2/favicons?domain=lucide.dev&sz=32', ARRAY['icons','svg','react'], 2, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '60df6ec5-16e9-42f7-8926-99cf8c9eec2c', '559cde71-7e54-4b40-a592-a947063b934a', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'React Hook Form', 'https://react-hook-form.com', 'Performant, flexible, and extensible forms with easy-to-use validation.',
  'https://www.google.com/s2/favicons?domain=react-hook-form.com&sz=32', ARRAY['forms','validation','react'], 3, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '0660fc37-07d5-41cc-965e-3f90d09f5e81', '559cde71-7e54-4b40-a592-a947063b934a', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'cmdk', 'https://cmdk.paco.me', 'Fast, composable, unstyled command menu for React. ⌘K all the things.',
  'https://www.google.com/s2/favicons?domain=cmdk.paco.me&sz=32', ARRAY['command-palette','keyboard','ux'], 4, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '7edbe652-b830-4524-8c02-0cf34747eb12', '8b492963-b59b-4ffc-9489-4096c87bd5b1', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'create.t3.gg', 'https://create.t3.gg', 'The best way to start a full-stack, typesafe Next.js app. T3 Stack: Next.js, tRPC, Prisma, Tailwind.',
  'https://www.google.com/s2/favicons?domain=create.t3.gg&sz=32', ARRAY['t3','fullstack','typescript'], 0, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '8fb65491-9717-415e-b49f-31361ab8994b', '8b492963-b59b-4ffc-9489-4096c87bd5b1', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Fireship', 'https://fireship.io', '100-second explainers and in-depth courses. The fastest way to learn modern web dev concepts.',
  'https://www.google.com/s2/favicons?domain=fireship.io&sz=32', ARRAY['tutorials','quick','concepts'], 1, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '9bd4bb35-385c-4695-8ccb-5ff8cceb71ec', '8b492963-b59b-4ffc-9489-4096c87bd5b1', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Josh tried coding', 'https://www.joshwcomeau.com', 'Deep-dive blog posts on React, CSS, and web animations. Incredibly well-written interactive tutorials.',
  'https://www.google.com/s2/favicons?domain=joshwcomeau.com&sz=32', ARRAY['react','css','interactive'], 2, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'd1fea8a9-6400-461b-a97b-7b83e3f3904e', '8b492963-b59b-4ffc-9489-4096c87bd5b1', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Lee Robinson', 'https://leerob.io', 'VP of Product at Vercel. Blog covers Next.js, web performance, and developer experience.',
  'https://www.google.com/s2/favicons?domain=leerob.io&sz=32', ARRAY['nextjs','performance','dx'], 3, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '1bb24780-db36-40bb-9fe4-b6249eb87b3d', '8b492963-b59b-4ffc-9489-4096c87bd5b1', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Kevin Powell', 'https://www.kevinpowell.co', 'The king of CSS. Tutorials that actually make you understand why CSS works the way it does.',
  'https://www.google.com/s2/favicons?domain=kevinpowell.co&sz=32', ARRAY['css','layout','fundamentals'], 4, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'b3c43bb7-ecd7-4405-9202-e7256d43725c', 'd14b2f38-6097-4e30-8842-ec664f1b8a41', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Dribbble', 'https://dribbble.com', 'Classic visual mood-boarding. Best for finding a feeling, not production patterns.',
  'https://www.google.com/s2/favicons?domain=dribbble.com&sz=32', ARRAY['inspiration','design','ui'], 2, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '29844f37-e707-4dc4-9970-44bc4abb09d0', 'd14b2f38-6097-4e30-8842-ec664f1b8a41', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Mobbin', 'https://mobbin.com', 'The most comprehensive real app screenshot library, organized by screen type and UI pattern.',
  'https://www.google.com/s2/favicons?domain=mobbin.com&sz=32', ARRAY['ux','patterns','mobile'], 3, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '6a8c11e3-61f8-4258-a00d-9c3e236eb06b', 'd14b2f38-6097-4e30-8842-ec664f1b8a41', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'AIverse', 'https://aiverse.design/', 'Curated gallery of UI designed for and by AI-native products.',
  'https://www.google.com/s2/favicons?domain=aiverse.design&sz=32', ARRAY['design','ai patterns'], 4, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'e2b25904-7b8b-4e0e-9927-e288378f17e5', 'd14b2f38-6097-4e30-8842-ec664f1b8a41', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Variant', 'https://variant.com/community', 'Generates design variations from prompts. Great for exploring directions fast',
  'https://www.google.com/s2/favicons?domain=variant.com&sz=32', ARRAY['inspiration','design','ui'], 5, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '0af00eee-6dd1-40b3-b891-963cafd29f48', 'd14b2f38-6097-4e30-8842-ec664f1b8a41', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Page Flows', 'https://pageflows.com/', 'Full user flow recordings from real products, not just static screens',
  'https://www.google.com/s2/favicons?domain=pageflows.com&sz=32', ARRAY['inspiration','design','ui'], 6, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '573c11e8-2a8c-47a5-aaea-07924a44dc11', 'e00aabb9-86e6-4f45-bed4-a28a1026a2cf', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Supabase', 'https://supabase.com', 'The open-source Firebase alternative. Postgres database, auth, storage, edge functions — all in one.',
  'https://www.google.com/s2/favicons?domain=supabase.com&sz=32', ARRAY['database','auth','postgres'], 0, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '97de34e9-6548-4444-bfb6-15e34706af18', 'e00aabb9-86e6-4f45-bed4-a28a1026a2cf', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Vercel', 'https://vercel.com', 'The platform for frontend developers. Deploy Next.js apps in seconds with zero config.',
  'https://www.google.com/s2/favicons?domain=vercel.com&sz=32', ARRAY['deployment','hosting','nextjs'], 1, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'af050931-4662-46ba-b9eb-ff498ab1bdf3', 'e00aabb9-86e6-4f45-bed4-a28a1026a2cf', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Upstash', 'https://upstash.com', 'Serverless Redis and Kafka. Pay per request, no idle cost. Perfect for rate limiting and caching.',
  'https://www.google.com/s2/favicons?domain=upstash.com&sz=32', ARRAY['redis','serverless','cache'], 2, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'f31deba5-d2cc-488d-8708-add9a542a2a1', 'e00aabb9-86e6-4f45-bed4-a28a1026a2cf', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Railway', 'https://railway.app', 'Infrastructure that just works. Deploy any app, any language, with databases included.',
  'https://www.google.com/s2/favicons?domain=railway.app&sz=32', ARRAY['deployment','infra','docker'], 3, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '57f3959f-ad45-497f-99be-032acd474575', 'e00aabb9-86e6-4f45-bed4-a28a1026a2cf', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Neon', 'https://neon.tech', 'Serverless Postgres. Autoscaling, branching, and a generous free tier. Deploy in seconds.',
  'https://www.google.com/s2/favicons?domain=neon.tech&sz=32', ARRAY['postgres','serverless','database'], 4, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'c2b98a11-c6cb-4937-a40a-a38c441e6523', 'e736f801-5763-4b92-b362-da5ba94f1d5d', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Radix UI', 'https://www.radix-ui.com', 'Unstyled, accessible components for building high-quality design systems and web apps.',
  'https://www.google.com/s2/favicons?domain=radix-ui.com&sz=32', ARRAY['headless','accessible','primitives'], 0, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'a5264003-3acb-42eb-9b33-b55b7cef8b55', 'e736f801-5763-4b92-b362-da5ba94f1d5d', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'v0.dev', 'https://v0.dev', 'Generate UI components from text prompts. Powered by Vercel AI. Outputs shadcn-compatible code.',
  'https://www.google.com/s2/favicons?domain=v0.dev&sz=32', ARRAY['ai','generation','components'], 0, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '1ef1f895-d451-4281-a757-0b7e8f7f30e9', 'e736f801-5763-4b92-b362-da5ba94f1d5d', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Cursor', 'https://cursor.com', 'The AI-first code editor. Built on VS Code with deep AI integration for vibe coding at full speed.',
  'https://www.google.com/s2/favicons?domain=cursor.com&sz=32', ARRAY['ai','editor','coding'], 1, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  'a7a8ed58-d67d-481a-adc1-69613c4cc94a', 'e736f801-5763-4b92-b362-da5ba94f1d5d', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Lovable', 'https://lovable.dev', 'Build full-stack apps with AI. Describe what you want, get working code deployed instantly.',
  'https://www.google.com/s2/favicons?domain=lovable.dev&sz=32', ARRAY['ai','fullstack','builder'], 2, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '9c744286-d5ca-487e-b389-43c15675c7dd', 'e736f801-5763-4b92-b362-da5ba94f1d5d', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Bolt', 'https://bolt.new', 'Prompt, run, edit, and deploy full-stack web apps in the browser. Powered by StackBlitz.',
  'https://www.google.com/s2/favicons?domain=bolt.new&sz=32', ARRAY['ai','fullstack','in-browser'], 3, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
INSERT INTO resources (id, column_id, board_id, added_by, title, url, description, favicon_url, tags, position, upvote_count)
VALUES (
  '47e2073f-8ccc-471e-841f-1af1e90317ce', 'e736f801-5763-4b92-b362-da5ba94f1d5d', '8cb0c064-74bd-42d9-9274-ef70de465006', 'e4ae2ca6-1622-417c-a986-8b9d2774c89b',
  'Claude', 'https://claude.ai', 'Anthropic''s AI assistant. Great for architecture decisions, debugging, and writing complex logic.',
  'https://www.google.com/s2/favicons?domain=claude.ai&sz=32', ARRAY['ai','assistant','reasoning'], 4, 0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, url = EXCLUDED.url, description = EXCLUDED.description,
  favicon_url = EXCLUDED.favicon_url, tags = EXCLUDED.tags,
  position = EXCLUDED.position, column_id = EXCLUDED.column_id;
