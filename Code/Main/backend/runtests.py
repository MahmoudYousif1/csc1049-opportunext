import os
import sys

def run_tests(test_type=None):
    if test_type == "unit":
        os.system("python manage.py test tests.UnitTests")
    elif test_type == "integration":
        os.system("python manage.py test tests.IntegrationTests")
    else:
        os.system("python manage.py test tests")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        run_tests(sys.argv[1])
    else:
        run_tests()


#Usage
#python runtests.py unit         (Runs only unit tests)
#python runtests.py integration  (Runs only integration tests)
#python runtests.py              (Runs all tests)
