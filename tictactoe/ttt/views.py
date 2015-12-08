from django.shortcuts import render
from .forms import RegForm
import random
from django.http import HttpResponse

#function that checks if computer is winner
def isComputer(inp):
  return inp=="OOO"

#function that checks if player is winner
def isPlayer(inp):
  return inp=="XXX"

#function to check diagonal winning condition forward and reverse
def diagonal(inp):
  ln = int(len(inp)**(1/2.0))
  fordia = ""
  revdia = ""
  #loop generates the forward and reverse diagonal strings
  for m in range(ln):
    fordia += inp[m * (ln + 1)]
    revdia += inp[(m + 1) * (ln - 1)]
  
  #check if player or computer is winner in forward or reverse diagonal
  if isPlayer(fordia) or isPlayer(revdia):
    return "Player"
  elif isComputer(fordia) or isComputer(revdia):
    return "Computer"

  return ""

#function to check horizontal winning condition
def horizontal(inp):
  ln = int(len(inp)**(1/2.0))
  forhor = ""

  #generates horizontal strings for each row and checks for the winner
  for i in range(0,len(inp),ln):
    forhor = inp[i:i+ln]
    if isPlayer(forhor):
      return "Player"
    elif isComputer(forhor):
      return "Computer"

  return "" 

#function to check vertical winning condition
def vertical(inp):
  ln = int(len(inp)**(1/2.0))
  forver = ""
  #generates vertical strings for each column and checks for the winner
  for i in range(ln):
    forver = [inp[x] for x in range(i,len(inp),3)]
    forver = "".join(forver)
    if isPlayer(forver):
      return "Player"
    elif isComputer(forver):
      return "Computer"

  return "" 

#game view. run http://127.0.0.1:8000/game/ to start game.
def game(request):
  context ={}
  if request.GET.has_key('didstr'):
    board_schema = str(request.GET.get('boardout')) #the boardmap string
    avail_posis = str(request.GET.get('didstr')) #list of available positions on the board

    #Generates the position of O by converting to 3D array
    temp1 = []
    for x in range(0,len(board_schema),3):
      temp2 = board_schema[x:x+3]
      temp1.append([y for y in temp2])
    if avail_posis != "":
      avail_posis = avail_posis.split(",")
      rand_pos = random.randrange(len(avail_posis))
      avail_posis = str(avail_posis[rand_pos])
      temp1[int(avail_posis[1:2])-1][int(avail_posis[2:3])-1] = "O"
    for i in range(len(temp1)):
      temp1[i] = "".join(temp1[i])
    temp1 = "".join(temp1)
    board_schema = temp1

    dia = diagonal(board_schema) #check diagonal winning condition
    ver = vertical(board_schema) #check vertical winning condition
    hor = horizontal(board_schema) #check horizontal winning condition

    #Winning or Draw condition for when board is at final playing position
    if avail_posis is "":
      if dia != "":
        return HttpResponse(dia)
      if hor != "":
        return HttpResponse(hor)
      if ver != "":
        return HttpResponse(ver)
      return HttpResponse("Draw")

    #Block for regular game winning conditions i.e board still not full
    if dia != "":
      return HttpResponse(avail_posis+","+dia)
    if hor != "":
      return HttpResponse(avail_posis+","+hor)
    if ver != "":
      return HttpResponse(avail_posis+","+ver)

    # other wise send back position data and board map
    avail_posis = avail_posis + "," + board_schema
    return HttpResponse(avail_posis)

  #initial page render
  return render(request,'game.html',context)