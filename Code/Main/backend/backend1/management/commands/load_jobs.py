import csv
import os
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from backend1.models import Job


class Command(BaseCommand):
    """
    Loads jobs from a CSV file into the Job model. 
    This command reads each row of the CSV file and updates or creates Job records in the database.
    """
    help = 'Load jobs from CSV file into the Job model'

    def add_arguments(self, parser):
        """
        Adds a command-line argument for the CSV file path. 
        The '--path' argument allows you to specify a custom CSV file location.
        """
        parser.add_argument(
            '--path',
            type=str,
            help='Path to the CSV file, default: dataset/postings.csv'
        )

    def handle(self, *args, **options):
        """
        Processes the CSV file and loads job data into the database. 
        It reads each row, converts fields to proper types, and updates or creates a Job instance accordingly.
        """
        # Default path if --path isn't specified:
        default_csv_path = os.path.join(settings.BASE_DIR, 'dataset', 'postings.csv')
        csv_path = options['path'] or default_csv_path

        if not os.path.exists(csv_path):
            raise CommandError(f"File not found: {csv_path}")

        try:
            with open(csv_path, mode='r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                count = 0

                for row in reader:
                    try:
                        def to_int(val):
                            """
                            Converts a string value to an integer if possible. 
                            Returns an integer or None if the value is empty.
                            """
                            return int(float(val)) if val else None

                        job_id_val = to_int(row.get('job_id'))
                        max_salary_val = to_int(row.get('max_salary'))
                        min_salary_val = to_int(row.get('min_salary'))
                        med_salary_val = to_int(row.get('med_salary'))
                        company_views_val = to_int(row.get('company_views'))
                        original_list_val = to_int(row.get('original_list'))
                        expiry_val = to_int(row.get('expiry'))
                        closed_tim_val = to_int(row.get('closed_tim'))
                        listed_time_val = to_int(row.get('listed_time'))
                        posting_dc_val = to_int(row.get('posting_dc'))
                        sponsored_val = to_int(row.get('sponsored'))
                        normalized_val = to_int(row.get('normalized'))
                        zip_code_val = to_int(row.get('zip_code'))
                        fips_val = to_int(row.get('fips'))

                        # Some columns are stored as float or strings.
                        remote_val = None
                        if row.get('remote_all'):
                            remote_val = float(row['remote_all'])

                        _, created = Job.objects.update_or_create(
                            job_id=job_id_val,
                            defaults={
                                'company_title': row.get('company_name', ''),
                                'title': row.get('title', ''),
                                'description': row.get('description', ''),
                                'max_salary': max_salary_val,
                                'pay_period': row.get('pay_period', ''),
                                'location': row.get('location', ''),
                                'company_views': company_views_val,
                                'med_salary': med_salary_val,
                                'min_salary': min_salary_val,
                                'formatted_applies': row.get('formatted_applies', ''),
                                'original_list': original_list_val,
                                'remote_all': remote_val,
                                'job_postin': row.get('job_posting_url', ''),
                                'application': row.get('application_url', ''),
                                'expiry': expiry_val,
                                'closed_tim': closed_tim_val,
                                'formatted_skills_desc': row.get('formatted_experience_level', ''),
                                'listed_time': listed_time_val,
                                'posting_dc': posting_dc_val,
                                'sponsored': sponsored_val,
                                'work_type': row.get('work_type', ''),
                                'currency': row.get('currency', ''),
                                'compensation': row.get('compensation_type', ''),
                                'normalized': normalized_val,
                                'zip_code': zip_code_val,
                                'fips': fips_val
                            }
                        )
                        count += 1

                    except Exception as e:
                        self.stdout.write(self.style.WARNING(
                            f"Error processing row: {row}\n{str(e)}"
                        ))

            self.stdout.write(self.style.SUCCESS(f"Successfully processed {count} rows."))

        except Exception as e:
            raise CommandError(f"Error reading CSV at {csv_path}: {str(e)}")
