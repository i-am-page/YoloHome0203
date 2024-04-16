#some testing

import firebase_admin
from firebase_admin import credentials, firestore

# Firebase credentials
cred = credentials.Certificate(r'GatewayServer\farmsmass-firebase-adminsdk-xracd-4ee4e1fcdb.json')
firebase_admin.initialize_app(cred)

# Initialize Cloud Firestore client
db = firestore.client()
transaction = db.transaction()

'''
data = {
    u'name': u'Los Angeles',
    u'state': u'CA',
    u'country': u'USA'
}
'''
feed_id = 2459141

daily_record_ref = db.collection(f"TempRecord/{feed_id}/Daily")
newRecordDoc = daily_record_ref.document(str(4545))

@firestore.transactional
def update_in_transaction(transaction, newRecordDoc):
    snapshot = newRecordDoc.get(transaction=transaction)
    transaction.set(newRecordDoc, {
        u'country': 'Japan'
    })

update_in_transaction(transaction, newRecordDoc)
