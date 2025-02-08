import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { HealthRecordsService } from '@/lib/services/health-records.service';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const type = formData.get('type') as string;
    const value = parseFloat(formData.get('value') as string);
    const unit = formData.get('unit') as string;
    const notes = formData.get('notes') as string;
    const files = formData.getAll('files') as File[];

    if (!type || isNaN(value) || !unit) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const attachments = await Promise.all(
      files.map(async (file) => ({
        file: Buffer.from(await file.arrayBuffer()),
        name: file.name,
        mimeType: file.type,
      }))
    );

    const healthRecords = new HealthRecordsService(
      session.accessToken as string,
      session.user.email
    );

    const result = await healthRecords.recordVitalWithAttachments(
      {
        patientName: session.user.name!,
        type,
        value,
        unit,
        notes,
      },
      attachments
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error recording vital:', error);
    return NextResponse.json(
      { error: 'Failed to record vital' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const healthRecords = new HealthRecordsService(
      session.accessToken as string,
      session.user.email
    );

    const vitals = await healthRecords.getPatientVitals();
    return NextResponse.json(vitals);
  } catch (error) {
    console.error('Error fetching vitals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vitals' },
      { status: 500 }
    );
  }
}
