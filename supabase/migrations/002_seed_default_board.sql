-- Seed the default VibeStack board
-- Replace 'your@email.com' with the email you used to sign up

do $$
declare
  v_owner_id uuid;
  v_board_id uuid;
  col_design uuid;
  col_ui uuid;
  col_tools uuid;
  col_backend uuid;
  col_tips uuid;
begin
  -- Get owner ID from your email
  select id into v_owner_id from auth.users where email = 'your@email.com';

  if v_owner_id is null then
    raise exception 'User not found. Make sure you have signed up first and replaced the email above.';
  end if;

  -- Create the default board
  insert into public.boards (owner_id, title, description, is_public)
  values (
    v_owner_id,
    'VibeStack — Curated Dev Resources',
    'A living collection of the best tools, libraries, and references for vibe coding. Contribute to add your own.',
    true
  )
  returning id into v_board_id;

  -- Create columns
  insert into public.columns (board_id, title, position, color)
  values (v_board_id, 'Design References', 0, '#a78bfa') returning id into col_design;

  insert into public.columns (board_id, title, position, color)
  values (v_board_id, 'UI Libraries', 1, '#60a5fa') returning id into col_ui;

  insert into public.columns (board_id, title, position, color)
  values (v_board_id, 'Vibe Coding Tools', 2, '#fbbf24') returning id into col_tools;

  insert into public.columns (board_id, title, position, color)
  values (v_board_id, 'Backend & Deployment', 3, '#34d399') returning id into col_backend;

  insert into public.columns (board_id, title, position, color)
  values (v_board_id, 'Tips & Tutorials', 4, '#f87171') returning id into col_tips;

  -- Design References
  insert into public.resources (column_id, board_id, added_by, title, url, description, favicon_url, tags, position) values
  (col_design, v_board_id, v_owner_id, 'shadcn/ui', 'https://ui.shadcn.com',
    'Beautifully designed components built with Radix UI and Tailwind CSS. Copy-paste into your project.',
    'https://www.google.com/s2/favicons?domain=ui.shadcn.com&sz=32', array['components', 'tailwind', 'design-system'], 0),
  (col_design, v_board_id, v_owner_id, 'Tailwind CSS', 'https://tailwindcss.com',
    'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=32', array['css', 'utility-first', 'styling'], 1),
  (col_design, v_board_id, v_owner_id, 'Dribbble', 'https://dribbble.com',
    'Where designers get inspired. Explore thousands of UI designs, color palettes, and interaction patterns.',
    'https://www.google.com/s2/favicons?domain=dribbble.com&sz=32', array['inspiration', 'design', 'ui'], 2),
  (col_design, v_board_id, v_owner_id, 'Mobbin', 'https://mobbin.com',
    'Hand-picked collection of mobile and web UI patterns from the world''s best designed apps.',
    'https://www.google.com/s2/favicons?domain=mobbin.com&sz=32', array['ux', 'patterns', 'mobile'], 3),
  (col_design, v_board_id, v_owner_id, 'Refactoring UI', 'https://www.refactoringui.com',
    'Learn UI design through examples. The book that teaches developers to design beautiful interfaces.',
    'https://www.google.com/s2/favicons?domain=refactoringui.com&sz=32', array['design', 'book', 'typography'], 4);

  -- UI Libraries
  insert into public.resources (column_id, board_id, added_by, title, url, description, favicon_url, tags, position) values
  (col_ui, v_board_id, v_owner_id, 'Radix UI', 'https://www.radix-ui.com',
    'Unstyled, accessible components for building high-quality design systems and web apps.',
    'https://www.google.com/s2/favicons?domain=radix-ui.com&sz=32', array['headless', 'accessible', 'primitives'], 0),
  (col_ui, v_board_id, v_owner_id, 'Framer Motion', 'https://www.framer.com/motion',
    'A production-ready motion library for React. Effortless animations and interactions.',
    'https://www.google.com/s2/favicons?domain=framer.com&sz=32', array['animation', 'react', 'motion'], 1),
  (col_ui, v_board_id, v_owner_id, 'Lucide Icons', 'https://lucide.dev',
    'Beautiful and consistent icon library. 1000+ open-source SVG icons for React, Vue, and more.',
    'https://www.google.com/s2/favicons?domain=lucide.dev&sz=32', array['icons', 'svg', 'react'], 2),
  (col_ui, v_board_id, v_owner_id, 'React Hook Form', 'https://react-hook-form.com',
    'Performant, flexible, and extensible forms with easy-to-use validation.',
    'https://www.google.com/s2/favicons?domain=react-hook-form.com&sz=32', array['forms', 'validation', 'react'], 3),
  (col_ui, v_board_id, v_owner_id, 'cmdk', 'https://cmdk.paco.me',
    'Fast, composable, unstyled command menu for React. ⌘K all the things.',
    'https://www.google.com/s2/favicons?domain=cmdk.paco.me&sz=32', array['command-palette', 'keyboard', 'ux'], 4);

  -- Vibe Coding Tools
  insert into public.resources (column_id, board_id, added_by, title, url, description, favicon_url, tags, position) values
  (col_tools, v_board_id, v_owner_id, 'v0.dev', 'https://v0.dev',
    'Generate UI components from text prompts. Powered by Vercel AI. Outputs shadcn-compatible code.',
    'https://www.google.com/s2/favicons?domain=v0.dev&sz=32', array['ai', 'generation', 'components'], 0),
  (col_tools, v_board_id, v_owner_id, 'Cursor', 'https://cursor.com',
    'The AI-first code editor. Built on VS Code with deep AI integration for vibe coding at full speed.',
    'https://www.google.com/s2/favicons?domain=cursor.com&sz=32', array['ai', 'editor', 'coding'], 1),
  (col_tools, v_board_id, v_owner_id, 'Lovable', 'https://lovable.dev',
    'Build full-stack apps with AI. Describe what you want, get working code deployed instantly.',
    'https://www.google.com/s2/favicons?domain=lovable.dev&sz=32', array['ai', 'fullstack', 'builder'], 2),
  (col_tools, v_board_id, v_owner_id, 'Bolt', 'https://bolt.new',
    'Prompt, run, edit, and deploy full-stack web apps in the browser. Powered by StackBlitz.',
    'https://www.google.com/s2/favicons?domain=bolt.new&sz=32', array['ai', 'fullstack', 'in-browser'], 3),
  (col_tools, v_board_id, v_owner_id, 'Claude', 'https://claude.ai',
    'Anthropic''s AI assistant. Great for architecture decisions, debugging, and writing complex logic.',
    'https://www.google.com/s2/favicons?domain=claude.ai&sz=32', array['ai', 'assistant', 'reasoning'], 4);

  -- Backend & Deployment
  insert into public.resources (column_id, board_id, added_by, title, url, description, favicon_url, tags, position) values
  (col_backend, v_board_id, v_owner_id, 'Supabase', 'https://supabase.com',
    'The open-source Firebase alternative. Postgres database, auth, storage, edge functions — all in one.',
    'https://www.google.com/s2/favicons?domain=supabase.com&sz=32', array['database', 'auth', 'postgres'], 0),
  (col_backend, v_board_id, v_owner_id, 'Vercel', 'https://vercel.com',
    'The platform for frontend developers. Deploy Next.js apps in seconds with zero config.',
    'https://www.google.com/s2/favicons?domain=vercel.com&sz=32', array['deployment', 'hosting', 'nextjs'], 1),
  (col_backend, v_board_id, v_owner_id, 'Upstash', 'https://upstash.com',
    'Serverless Redis and Kafka. Pay per request, no idle cost. Perfect for rate limiting and caching.',
    'https://www.google.com/s2/favicons?domain=upstash.com&sz=32', array['redis', 'serverless', 'cache'], 2),
  (col_backend, v_board_id, v_owner_id, 'Railway', 'https://railway.app',
    'Infrastructure that just works. Deploy any app, any language, with databases included.',
    'https://www.google.com/s2/favicons?domain=railway.app&sz=32', array['deployment', 'infra', 'docker'], 3),
  (col_backend, v_board_id, v_owner_id, 'Neon', 'https://neon.tech',
    'Serverless Postgres. Autoscaling, branching, and a generous free tier. Deploy in seconds.',
    'https://www.google.com/s2/favicons?domain=neon.tech&sz=32', array['postgres', 'serverless', 'database'], 4);

  -- Tips & Tutorials
  insert into public.resources (column_id, board_id, added_by, title, url, description, favicon_url, tags, position) values
  (col_tips, v_board_id, v_owner_id, 'create.t3.gg', 'https://create.t3.gg',
    'The best way to start a full-stack, typesafe Next.js app. T3 Stack: Next.js, tRPC, Prisma, Tailwind.',
    'https://www.google.com/s2/favicons?domain=create.t3.gg&sz=32', array['t3', 'fullstack', 'typescript'], 0),
  (col_tips, v_board_id, v_owner_id, 'Fireship', 'https://fireship.io',
    '100-second explainers and in-depth courses. The fastest way to learn modern web dev concepts.',
    'https://www.google.com/s2/favicons?domain=fireship.io&sz=32', array['tutorials', 'quick', 'concepts'], 1),
  (col_tips, v_board_id, v_owner_id, 'Josh tried coding', 'https://www.joshwcomeau.com',
    'Deep-dive blog posts on React, CSS, and web animations. Incredibly well-written interactive tutorials.',
    'https://www.google.com/s2/favicons?domain=joshwcomeau.com&sz=32', array['react', 'css', 'interactive'], 2),
  (col_tips, v_board_id, v_owner_id, 'Lee Robinson', 'https://leerob.io',
    'VP of Product at Vercel. Blog covers Next.js, web performance, and developer experience.',
    'https://www.google.com/s2/favicons?domain=leerob.io&sz=32', array['nextjs', 'performance', 'dx'], 3),
  (col_tips, v_board_id, v_owner_id, 'Kevin Powell', 'https://www.kevinpowell.co',
    'The king of CSS. Tutorials that actually make you understand why CSS works the way it does.',
    'https://www.google.com/s2/favicons?domain=kevinpowell.co&sz=32', array['css', 'layout', 'fundamentals'], 4);

  -- Print the board ID — copy this into your .env.local as NEXT_PUBLIC_DEFAULT_BOARD_ID
  raise notice '✅ Default board created! Board ID: %', v_board_id;
  raise notice 'Add this to your .env.local:';
  raise notice 'NEXT_PUBLIC_DEFAULT_BOARD_ID=%', v_board_id;
end;
$$;
