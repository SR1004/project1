import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = pygame.display.Info().current_w, pygame.display.Info().current_h
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.FULLSCREEN)
pygame.display.set_caption("2D Fighting Game")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)

# FPS
clock = pygame.time.Clock()
FPS = 60

# Character settings
PLAYER_WIDTH, PLAYER_HEIGHT = 50, 70
NPC_WIDTH, NPC_HEIGHT = 50, 70
PROJECTILE_WIDTH, PROJECTILE_HEIGHT = 10, 5

# Player class
class Player(pygame.Rect):
    def __init__(self, x, y):
        super().__init__(x, y, PLAYER_WIDTH, PLAYER_HEIGHT)
        self.hp = 100
        self.speed = 5
        self.damage = 20
        self.is_defending = False
        self.facing_right = True

# NPC class
class NPC(pygame.Rect):
    def __init__(self, x, y):
        super().__init__(x, y, NPC_WIDTH, NPC_HEIGHT)
        self.hp = 50
        self.speed = 2
        self.damage = 1

# Projectile class
class Projectile(pygame.Rect):
    def __init__(self, x, y, direction):
        super().__init__(x, y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT)
        self.speed = 10 * direction

# Game setup
player = Player(100, HEIGHT - PLAYER_HEIGHT - 10)
npcs = []
projectiles = []

# Spawn NPCs continuously
def spawn_npc():
    if len(npcs) < 5:
        npcs.append(NPC(random.randint(100, WIDTH - NPC_WIDTH), HEIGHT - NPC_HEIGHT - 10))

# Main loop
running = True
while running:
    clock.tick(FPS)
    screen.fill(BLACK)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False

    # Player controls
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player.x -= player.speed
        player.facing_right = False
    if keys[pygame.K_RIGHT]:
        player.x += player.speed
        player.facing_right = True
    player.is_defending = keys[pygame.K_SPACE]

    # Attack handling - shoot projectile in player's facing direction
    if keys[pygame.K_x]:
        direction = 1 if player.facing_right else -1
        projectiles.append(Projectile(player.x + PLAYER_WIDTH // 2, player.y + PLAYER_HEIGHT // 2, direction))

    # Move projectiles
    for projectile in projectiles:
        projectile.x += projectile.speed

    # Check for projectile collisions
    for projectile in projectiles[:]:
        for npc in npcs[:]:
            if projectile.colliderect(npc):
                npcs.remove(npc)
                projectiles.remove(projectile)
                break

    # NPC movement and attacks
    for npc in npcs:
        if npc.x < player.x:
            npc.x += npc.speed
        else:
            npc.x -= npc.speed
        
        # NPC collision with player
        if npc.colliderect(player) and not player.is_defending:
            player.hp -= npc.damage

    # Remove off-screen projectiles
    projectiles = [p for p in projectiles if 0 < p.x < WIDTH]

    # Spawn new NPCs
    spawn_npc()

    # Draw player and NPCs
    pygame.draw.rect(screen, GREEN, player)
    for npc in npcs:
        pygame.draw.rect(screen, RED, npc)
    for projectile in projectiles:
        pygame.draw.rect(screen, WHITE, projectile)

    # Draw HP bar
    pygame.draw.rect(screen, RED, (10, 10, player.hp * 2, 20))
    pygame.draw.rect(screen, WHITE, (10, 10, 200, 20), 2)

    # Game over
    if player.hp <= 0:
        font = pygame.font.SysFont(None, 74)
        text = font.render("Game Over", True, RED)
        screen.blit(text, (WIDTH // 2 - text.get_width() // 2, HEIGHT // 2))
    
    pygame.display.flip()

pygame.quit()
sys.exit()