import speech_recognition as sr
from os import path

class SpeechRecodniser(object):

    def recogniserFunc(self):

        AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), "audio.wav")

        # use the audio file as the audio source
        
        r = sr.Recognizer()
        temp = "Speech Recognition could not understand audio"
        with sr.AudioFile(AUDIO_FILE) as source:
            # print("Say something!")
            audio = r.record(source)  # read the entire audio file
            try:
                return r.recognize_google(audio)
            except:
                return temp
