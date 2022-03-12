from flask import Flask, request
from flask_cors import CORS
from rpunct import RestorePuncts
import torch.cuda
import json


app = Flask(__name__, instance_relative_config=True)
CORS(app)


@app.route("/", methods=['GET'])
def hello():
  """flask live test api"""
  return "구문처리 플라스크 서버 작동중"


@app.route('/api/punct', methods=['POST'])
def punct():
  print('플라스크 Flsk 서버 Post: /api/punct 시작')
  params = json.loads(request.get_data())
  if len(params) == 0:
      return 'No parameter'

  params_str = ''
  for key in params.keys():
      params_str += 'key: {}, value: {}<br>'.format(key, params[key])

  # use_cuda=torch.cuda.is_available()
  # print(f'useCuda: {use_cuda}')
  rpunct = RestorePuncts()
  subtitles_puct = rpunct.punctuate(params['subtitles'])

  return subtitles_puct

  
app.run(host='0.0.0.0')