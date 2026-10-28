import { NextResponse } from 'next/server';
import { ANNOUNCEMENT_BACKGROUNDS, ANNOUNCEMENT_TEXT_COLORS } from '@/config/announcement';
import { verifySession } from '@/lib/auth';
import { getAnnouncement, saveAnnouncement } from '@/lib/announcement-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const backgroundIds = new Set(ANNOUNCEMENT_BACKGROUNDS.map((color) => color.id));
const textColorIds = new Set(ANNOUNCEMENT_TEXT_COLORS.map((color) => color.id));

export async function GET() {
  try {
    const announcement = await getAnnouncement();
    return NextResponse.json(announcement, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    console.error('Could not load announcement:', error);
    return NextResponse.json({ error: 'Announcement settings could not be loaded.' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const value = await request.json();
    const message = typeof value?.message === 'string' ? value.message.trim() : '';

    if (typeof value?.enabled !== 'boolean') {
      return NextResponse.json({ error: 'Choose whether the announcement bar is enabled.' }, { status: 400 });
    }

    if (!message || message.length > 180) {
      return NextResponse.json({ error: 'Announcement message must be between 1 and 180 characters.' }, { status: 400 });
    }

    if (!backgroundIds.has(value.backgroundColor) || !textColorIds.has(value.textColor)) {
      return NextResponse.json({ error: 'Choose colors from the available theme palette.' }, { status: 400 });
    }

    const announcement = await saveAnnouncement({
      enabled: value.enabled,
      message,
      backgroundColor: value.backgroundColor,
      textColor: value.textColor,
    });

    return NextResponse.json(announcement);
  } catch (error) {
    console.error('Could not save announcement:', error);
    return NextResponse.json({ error: 'Announcement settings could not be saved.' }, { status: 500 });
  }
}
