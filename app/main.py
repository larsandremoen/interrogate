import re
import json
from random import randint
import random
import time
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# due to facebooks
def parse_obj(dct):
    for key in dct:
        if(isinstance(dct[key], str)):
            dct[key] = dct[key].encode('latin_1').decode('utf-8')


        if(dct.get('reactions', False)):
            tmp_reactions = []

            for reaction in dct['reactions']:
                try:
                    tmp_reaction = reaction['reaction'].encode('latin_1').decode('utf-8')
                    tmp_actor = reaction['actor'].encode('latin_1').decode('utf-8')
                    tmp_reactions.append({
                        'reaction': tmp_reaction,
                        'actor': tmp_actor
                    })

                except Exception:

                    tmp_reactions.append(reaction)
            dct['reactions'] = tmp_reactions


        pass
    return dct

def get_questions(all_messages, participants, number_of_questions = 15):
    questions = []
    questions_taken_index = []
    for i in range(0, number_of_questions):
        used_index = []
        answer_indexes = [1,2,3,4]

        wrong_answers = []

        all_messages_list_indexes = list(range(0, len(all_messages)))
        while(True):
            message_index = random.choice(all_messages_list_indexes)
            message = all_messages[message_index]

            #max len of question is 120. 'Who said: ' is 10 chars
            if(message_index not in questions_taken_index and len(message) <= 110):

                if(message.get('content', False)):
                    used_index.append(message_index)
                    break




        sender = message['sender_name']
        content = message['content']

        allowed_participants = list(range(0, len(participants)))
        sender_participant = participants.index(sender)
        allowed_participants.remove(sender_participant)

        correct_answer_index = random.choice(answer_indexes)
        answer_indexes.remove(correct_answer_index)
        question =  {
            "question": f"Who said: {content}",
            "time": 20,
            f"answer{correct_answer_index}": f'{sender}',
            "correct": f'{correct_answer_index}'
        }

        for i in range(3):
            wrong_answer_index = random.choice(answer_indexes)
            answer_indexes.remove(wrong_answer_index)

            wrong_sender_index = random.choice(allowed_participants)
            allowed_participants.remove(wrong_sender_index)

            wrong_values = {
                f"answer{wrong_answer_index}": f'{participants[wrong_sender_index]}',
            }

            question.update(wrong_values)
        questions.append(question)
    return questions


@app.post('/interrogate')
async def generate(request: Request):
    request_body = await request.json()
    request_body_raw = await request.body()

    message = json.loads(request_body["data"])

    for dct in message['messages']:
        parse_obj(dct)
    for dct in message['participants']:
        parse_obj(dct)

    all_messages = []
    participants_list = []
    participants = []

    #TODO has to be at least 4 participants
    #TODO has to be at least 15 messages

    for msg in message['messages']:
        all_messages.append(msg)
    for name in message['participants']:

        participants.append(name['name'])

    return get_questions(all_messages, participants)