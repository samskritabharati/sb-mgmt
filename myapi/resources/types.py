from flask_restful import Resource
from ..db import *

class _Types(Resource):
    cname = None

    def get(self):
        if not self.cname:
            return {}
        coll = sbget()[self.cname]
        return sorted(coll.all().keys())

class region_types(_Types):
    def __init__(self):
        self.cname = 'region_types'

class role_types(_Types):
    def __init__(self):
        self.cname = 'role_types'

class project_types(_Types):
    def __init__(self):
        self.cname = 'project_types'

class activity_types(_Types):
    def __init__(self):
        self.cname = 'activity_types'

class Presets(Resource):
    _presets = {
        'Profession' :
            ['Technical Professional', \
            'Student', 'Self-employed', 'Not Employed', 'Homemaker', \
            'Vedic', 'Sanskrit Teaching', 'Sanskrit Pundit', 'Education', \
            'Other'],
        'Recurrence' :
            ['daily', 'weekly', 'monthly', 'yearly'],
    }
    def get(self, field=None):
        
        if field:
            if field in self._presets:
                return self._presets[field]
            elif field == 'Project_type_id':
                return project_types().get()
            elif field == 'Praanta_type_id':
                return region_types().get()
            elif field == 'Activity_type_id':
                return activity_types().get()
            elif field == 'Role_id':
                return role_types().get()
            else:
                return []
        else:
            return sorted(self._presets.keys() + \
                ['Project_type_id', 'Praanta_type_id', 'Activity_type_id', \
                    'Role_id'])
